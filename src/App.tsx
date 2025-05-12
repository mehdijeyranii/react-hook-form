import React from "react";
import SimpleForm from "./components/SimpleForm";
import RegisterForm from "./components/RegisterForm";
import BookForm from "./components/BookForm";

const App: React.FC = () => {
  return (
    <div className="p-5">
      <SimpleForm />
      <hr />
      <RegisterForm />
      <hr />
      <BookForm />
    </div>
  );
};

export default App;
