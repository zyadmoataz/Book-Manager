import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      {/* app name */}
      <div>Personal Book Manager</div>
      {/* nav links */}
      <nav>
        <Link to='/add-book'>Add Book</Link>
      </nav>
    </header>
  );
}
