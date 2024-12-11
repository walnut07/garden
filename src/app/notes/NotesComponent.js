'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MarkdownIt from 'markdown-it';
import * as chrono from 'chrono-node';
import '@/styles/notes.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

export default function NotesComponent({ notes }) {
  const searchParams = useSearchParams();

  const dateFilter = searchParams.get('date');
  const tagFilter = searchParams.get('tag');

  const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
        } catch (__) {}
      }
      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    }
  });

  // State to hold unique tags, initialized once
  const [uniqueTags, setUniqueTags] = useState([]);

  // Initialize unique tags only once
  useEffect(() => {
    const tags = Array.from(
      new Set(
        notes
          .flatMap((note) => note.tags || [])
          .filter((tag) => tag && tag.length > 0) // Eliminate empty strings
      )
    );
    setUniqueTags(tags);
  }, [notes]);
  
  const getFilteredNotes = () => {
    return notes
      .map((note) => {
        if (note.date) {
          const parsedDate = chrono.parseDate(note.date);
          note.date = parsedDate ? parsedDate.toISOString().split('T')[0] : null;
        }
        return note;
      })
      .filter((note) => {
        const matchesDate = dateFilter ? note.date?.startsWith(dateFilter) : true;
        const matchesTag = tagFilter ? note.tags?.includes(tagFilter) : true;
        return matchesDate && matchesTag;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date || 0);
        const dateB = new Date(b.date || 0);
        return dateB - dateA;
      });
  };  

  const [filteredNotes, setFilteredNotes] = useState(getFilteredNotes);
  const [visibleNotes, setVisibleNotes] = useState(filteredNotes.slice(0, 5));
  const [loadedCount, setLoadedCount] = useState(5);

  useEffect(() => {
    const filtered = getFilteredNotes();
    setFilteredNotes(filtered);
    setVisibleNotes(filtered.slice(0, 5));
    setLoadedCount(5);
  }, [dateFilter, tagFilter]);

  const loadMoreNotes = () => {
    const nextNotes = filteredNotes.slice(loadedCount, loadedCount + 5);
    setVisibleNotes((prevNotes) => [...prevNotes, ...nextNotes]);
    setLoadedCount((prevCount) => prevCount + 5);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreNotes();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadedCount, filteredNotes]);

  const generateDateIndex = () => {
    const startDate = new Date('2024-11-01');
    const currentDate = new Date();
    const dateLinks = [];

    while (startDate <= currentDate) {
      const year = startDate.getFullYear();
      const month = String(startDate.getMonth() + 1).padStart(2, '0'); 
      dateLinks.push(`${year}-${month}`);
      startDate.setMonth(startDate.getMonth() + 1);
    }

    return dateLinks.reverse();
  };

  const dateIndex = generateDateIndex();

  let message = 'All Notes';
  if (dateFilter && tagFilter) {
    message = `Notes taken in ${dateFilter} with a tag "${tagFilter}"`;
  } else if (dateFilter) {
    message = `Notes taken in ${dateFilter}`;
  } else if (tagFilter) {
    message = `Notes with a tag "${tagFilter}"`;
  }

  return (
    <div>
      <Navbar />
      <div className="notes-container">
        <aside className="notes-sidebar">
          <h3>Date Index</h3>
          <ul>
            {dateIndex.map((date) => (
              <li key={date}>
                <Link href={`?date=${date}`}>{date}</Link>
              </li>
            ))}
          </ul>
          <h3>Tags</h3>
          <ul>
            {uniqueTags.map((tag) => (
              <li key={tag}>
                <Link href={`?tag=${tag}`}>#{tag}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="notes-list-area">
          <h1>{message}</h1>
          {visibleNotes.length > 0 ? (
            <ul className="notes-list">
              {visibleNotes.map((note) => (
                <li className="note-item" key={note.slug}>
                  <Link href={`/notes/${note.slug}`} style={{textDecoration: "none"}}>
                    <div>
                      <h2 className="note-title">{note.title}</h2>
                      <p className="note-date">Created on: {note.date || 'Unknown'}</p>
                      <div className="note-tags">
                        {Array.isArray(note.tags) && note?.tags?.map((tag) => (
                          <span className="note-tag" key={tag}>
                            #{tag}
                          </span>
                        ))}
                        {!Array.isArray(note.tags) && 
                          <span className="note-tag" key={note.tags}>
                            #{note.tags}
                          </span>
                        }
                      </div>
                      <div
                        className="note-content"
                        dangerouslySetInnerHTML={{ __html: md.render(note.content) }}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Oops, no notes found for the selected filters!</p>
          )}
        </main>
      </div>
    </div>
  );
}
