import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownIt from 'markdown-it';

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


const md = new markdownIt();

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
