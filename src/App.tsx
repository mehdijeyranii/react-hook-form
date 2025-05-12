import React from "react";
import SimpleForm from "./components/SimpleForm";
import RegisterForm from "./components/RegisterForm";

const App: React.FC = () => {
  return (
    <div className="p-5">
      <SimpleForm />
      <hr />
      <RegisterForm />
    </div>
  );
};

export default App;
