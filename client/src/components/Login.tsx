import React, { useState } from "react";
import { User } from "../types/User";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", user);
      alert("Login Successful");
      console.log(response.data);

      localStorage.setItem("userId", `${response.data.id}`);
      navigate("/dashboard");
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
        <h2 className="text-2xl mb-4 text-center">Login</h2>
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
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
