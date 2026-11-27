import { Link } from 'react-router-dom';

export default function Navbar({ name = "Sayem", age = 22 }) {
  return (
    <nav className="mb-4 pb-3 border-b flex flex-wrap items-center gap-4 text-blue-600">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/group1/about" className="hover:underline">About</Link>
      <Link to="/group2/dashboard" className="hover:underline">Dashboard</Link>
      <Link to="/usestate" className="hover:underline">useState</Link>
      <Link to="/event-handling" className="hover:underline">Events</Link>
      <Link to="/conditional-list" className="hover:underline">List</Link>
      <Link to="/real-life-api" className="hover:underline">Fetch API</Link>
      <Link to="/axios-real-life-api" className="hover:underline">Axios API</Link>
      <Link to="/students" className="hover:underline font-medium">Students API</Link>
      <span className="ml-auto text-sm font-medium text-green-600">
        {name} | {age}
      </span>
    </nav>
  );
}
