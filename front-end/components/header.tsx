import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header>
      <a className="header-title">myFit</a>
      <nav className="navbar">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/profile" className="nav-link">Profile</Link>
        <Link href="/workout" className="nav-link">Workout</Link>
        <Link href="/post" className="nav-link">Posts</Link>
      </nav>
    </header>
  );
};

export default Header;
