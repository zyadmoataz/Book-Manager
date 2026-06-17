import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      {/* app name */}
      <div>Personal Book Manager</div>
      {/* nav links */}
      <nav>
        <ul>
          {/* <li>
            <Link to='/books'>Books</Link>
          </li>
          <li>
            <Link to='/add-book'>Add Book</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
