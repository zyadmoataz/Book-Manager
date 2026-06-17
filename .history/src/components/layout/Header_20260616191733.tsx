import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className=''>
      {/* 1. App name */}
      <div>Personal Book Manager</div>

      {/* 2. Navigation links */}
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/add-book'>Add Book</Link>
          </li>
          <li>
            <Link to='/favorites'>Favorites</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
