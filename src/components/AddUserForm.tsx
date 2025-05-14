import React, { useEffect, useState } from "react";
import type { IUser } from "../types/user";

interface AddUserFormProps {
  onUserAdded: (user: IUser) => void;
  editingUser?: IUser | null;
  onUserUpdated?: (user: IUser) => void;
  cancelEdit?: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({
  onUserAdded,
  editingUser,
  onUserUpdated,
  cancelEdit,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userPayload = { name, email };

    if (editingUser) {
      const response = await fetch(
        `http://localhost:5000/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userPayload),
        }
      );

      const updatedUser = await response.json();
      onUserUpdated?.(updatedUser);
    } else {
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userPayload),
        });
        if (!response.ok) throw new Error("Failed to add user");
        const data = await response.json();
        onUserAdded(data);
        setName("");
        setEmail("");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingUser]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-8 border p-5">
      <h3 className="text-2xl text-rose-600">Add new user</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border w-full p-2"
      />

      <input
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border w-full p-2"
      />

      <button className="px-4 py-2 bg-amber-500 text-white" type="submit">
        {editingUser ? "Edit" : "Add"}
      </button>
      {editingUser && (
        <button
          onClick={cancelEdit}
          className="px-4 py-2 bg-rose-500 text-white"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddUserForm;
