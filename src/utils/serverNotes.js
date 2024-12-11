import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const notesDirectory = path.join(process.cwd(), 'public', 'notes/logseq-pages');

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
