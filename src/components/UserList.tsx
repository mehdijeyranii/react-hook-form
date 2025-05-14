import { useEffect, useState } from "react";
import type { IUser } from "../types/user";
import AddUserForm from "./AddUserForm";

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data: IUser[]) => {
        setUsers(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = (user: IUser) => {
    setUsers((prev) => [...prev, user]);
  };

  if (loading) return <p className="text-3xl bg-amber-100 p-5">Loading...</p>;

  return (
    <div className="bg-amber-100 p-5">
      <h2 className="text-xl text-neutral-800">Users List</h2>
      <AddUserForm onUserAdded={handleUserAdded} />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
