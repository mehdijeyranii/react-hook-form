import React, { useState } from "react";
import type { IUser } from "../types/user";

interface AddUserFormProps {
  onUserAdded: (user: IUser) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onUserAdded }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { name, email };

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    onUserAdded(data);

    setName("");
    setEmail("");
  };
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
        Add
      </button>
    </form>
  );
};

export default AddUserForm;
