import React from "react";
import SimpleForm from "./components/SimpleForm";
import RegisterForm from "./components/RegisterForm";
import BookForm from "./components/BookForm";
import TaskForm from "./components/TaskForm";
import TeamForm from "./components/TeamForm";
import SignupForm from "./components/SignupForm";

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
      <hr />
      <SignupForm />
    </div>
  );
};

export default App;
