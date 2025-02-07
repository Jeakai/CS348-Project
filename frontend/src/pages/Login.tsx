import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginResponse {
  token: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post<LoginResponse>("http://localhost:3000/api/login", {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("authToken", token); // Store the token
        console.log("Login successful");
        navigate("/mainpage"); // Navigate to the main page or dashboard
      } else {
        setError("Token not received. Please try again.");
      }
    } catch (err: unknown) {  // ✅ Changed from 'any' to 'unknown'
      if ((err as any)?.response?.data?.error) {  // ✅ Manually asserting the error type
        setError((err as any).response.data.error);
      } else {
        setError("An unknown error occurred.");
      }
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center font-mono text-black">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
        >
          Log In
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-500">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
