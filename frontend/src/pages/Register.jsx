import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registered successfully. Please login.");
      navigate("/"); // ✅ correct navigation
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={registerHandler}
        className="bg-slate-800 p-8 rounded-xl w-80 shadow-lg"
      >
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white outline-none"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Register
        </button>
        <span className="text-sm text-gray-400 mt-4 block text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-400 hover:underline">
            Login
          </a>
        </span>
      </form>
    </div>
  );
}
