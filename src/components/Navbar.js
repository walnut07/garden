import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/notes" className="navbar-link">
            Notes
          </Link>
        </li>
        {/* <li className="navbar-item">
          <Link href="/posts" className="navbar-link">
            Post
          </Link>
        </li> */}
        <li className="navbar-item">
          <Link href="/resume" className="navbar-link">
            Resume
          </Link>
        </li>
      </ul>
    </nav>
  );
}
