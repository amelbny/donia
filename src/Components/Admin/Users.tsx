import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";

interface User {
  _id: string;
  firstname: string;
  lastname?: string; // Marking lastname as optional since not all users might have it
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get(
          "http://localhost:3000/api/v1/users/all"
        );
        setUsers(response.data.data.docs); 
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch users:", err);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center pt-24 pb-10">
      <h2>User List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.firstname} {user.lastname}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
