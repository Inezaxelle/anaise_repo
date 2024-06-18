import React, {useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:4000/api/signin", values)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.accessToken);
            navigate('/books');
          } else {
            alert("No record exists");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#243c5a]">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              className="w-full p-3 border rounded-md bg-[#F6F6F6] focus:bg-white focus:border-2 focus:outline-none"
              type="email"
              placeholder="Email Address"
              required
              name="email"
              onChange={handleInput}
            />
          </div>
          <div className="relative">
            <input
              className="w-full p-3 border rounded-md bg-[#F6F6F6] focus:bg-white focus:border-2 focus:outline-none"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              name="password"
              onChange={handleInput}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {!passwordVisible ? <FiEyeOff className="text-gray-500" /> : <FiEye className="text-gray-500" />}
            </span>
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-[#243c5a]">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#243c5a] text-white font-bold rounded-md"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#243c5a]">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
