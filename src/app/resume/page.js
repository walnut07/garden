import Navbar from '@/components/Navbar';
import MarkdownIt from 'markdown-it';
import fs from 'fs';
import path from 'path';
import '@/styles/resume.css';

export default function ResumePage() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'resume.md');
  const content = fs.readFileSync(filePath, 'utf8');

  const md = new MarkdownIt();

  return (
    <div>
      <Navbar />
      <div className="resume-container" style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
      </div>
    </div>
  );
}
