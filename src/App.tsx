import React from "react";
import SimpleForm from "./components/SimpleForm";
import RegisterForm from "./components/RegisterForm";
import BookForm from "./components/BookForm";
import TaskForm from "./components/TaskForm";
import TeamForm from "./components/TeamForm";

const App: React.FC = () => {
  return (
    <div className="p-5">
      <SimpleForm />
      <hr />
      <RegisterForm />
      <hr />
      <BookForm />
      <hr />
      <TaskForm />
      <hr />
      <TeamForm />
    </div>
  );
};

export default App;
