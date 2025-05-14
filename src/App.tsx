import React from "react";
import UserList from "./components/UserList";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl p-5">RESTful API - React + TS</h1>
      <UserList />
    </div>
  );
};

export default App;
