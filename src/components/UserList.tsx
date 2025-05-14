import { useEffect, useState } from "react";
import type { IUser } from "../types/user";
import AddUserForm from "./AddUserForm";

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

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

  const handleUserUpdated = (updatedUser: IUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleCancel = () => {
    setEditingUser(null);
  }

  if (loading) return <p className="text-3xl bg-amber-100 p-5">Loading...</p>;

  return (
    <div className="bg-amber-100 p-5">
      <h2 className="text-xl text-neutral-800">Users List</h2>
      <AddUserForm
        onUserAdded={handleUserAdded}
        editingUser={editingUser}
        onUserUpdated={handleUserUpdated}
        cancelEdit={handleCancel}
      />
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex  gap-4 border p-5">
            <span>
              {user.name} - {user.email}
            </span>
            <button
              className="ml-2 text-blue-600 underline"
              onClick={() => setEditingUser(user)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
