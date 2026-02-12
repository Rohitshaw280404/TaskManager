import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", { email, password });
      navigate("/dashboard"); // ✅ correct navigation
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={loginHandler}
        className="bg-slate-800 p-8 rounded-xl w-80 shadow-lg"
      >
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-6 p-2 rounded bg-slate-700 text-white outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Login
        </button>

        <span className="text-sm text-gray-400 mt-4 block text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </span>




        
      </form>
    </div>
  );
}
