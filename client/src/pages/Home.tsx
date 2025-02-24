import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-4xl mb-4">Event Management System</h1>
        <Link to="/register" className="text-blue-500 mr-4">
          Register
        </Link>
        <Link to="/login" className="text-green-500">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
