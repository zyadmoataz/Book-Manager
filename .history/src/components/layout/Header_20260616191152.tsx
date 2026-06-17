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
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/add-book'>Add Book</Link>
          </li>
          <li>
            <Link to='/edit-book/:id'>Edit Book</Link>
          </li>
          <li>
            <Link to='/delete-book/:id'>Delete Book</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
