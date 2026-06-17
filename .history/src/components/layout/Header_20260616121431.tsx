import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      {/* app name */}
      <div>Personal Book Manager</div>
      {/* nav links */}
      <nav>
        <ul>
          <li>
            <Link to='/'>Books</Link>
          </li>
          <li>
            <Link to='/'>Add Book</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
