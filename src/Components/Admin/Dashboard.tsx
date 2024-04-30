import { Link } from "react-router-dom";

const Admin: React.FC = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
