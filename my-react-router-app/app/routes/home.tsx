import { Link } from "react-router";

export default function Home() {
  return (
    <div className="container">

      <h1>Sports Management Portal</h1>

      <div className="cards">

        <Link to="/feedback">
          <button>Feedback</button>
        </Link>

        <Link to="/sports">
          <button>Sports Enrollment</button>
        </Link>

        <Link to="/attendance">
          <button>Mark Attendance</button>
        </Link>

      </div>

    </div>
  );
}