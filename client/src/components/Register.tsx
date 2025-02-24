import React, { useState } from "react";
import { User } from "../types/User";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [user, setUser] = useState<User>({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/register", user);
      alert(response.data.message);
      navigate("/login");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 p-6 shadow-md rounded-lg bg-white"
      >
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
