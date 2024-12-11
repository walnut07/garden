import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const notesDirectory = path.join(process.cwd(), 'src/data/notes/logseq-pages');

export function getAllNotes() {
  const filenames = fs.readdirSync(notesDirectory);

  return filenames.map((filename) => {
    const filePath = path.join(notesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content: content || '',
      slug: filename.replace('.md', ''),
      excerpt: content.substring(0, 180) || '',
    };
  });
}


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

export function getAllNoteSlugs() {
  const filenames = fs.readdirSync(notesDirectory);
  return filenames.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));
}

export function getNoteBySlug(slug) {
  const filePath = path.join(notesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...data,
    content: md.render(content),
  };
}
