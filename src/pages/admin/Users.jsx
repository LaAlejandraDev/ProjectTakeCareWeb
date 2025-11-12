import React from "react";
import UserForm from "../../components/Users/UserForm";

const Users = () => {
  return (
    <div className="w-full h-full flex flex-col items-center shadow-lg">
      <div className="w-full p-4 bg-base-300 shadow-lg">
        <UserForm />
      </div>
    </div>
  );
};

export default Users;
