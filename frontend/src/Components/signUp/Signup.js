import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./SignUpValidation";



export default  function Signup(){


  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errors, setError] = useState("");
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstname:'',
    lastname:'',
    email: '',
    password: ''
  });
  
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:4000/api/signup", values)
        .then((res) => {
          if (res.status === 200) {
            navigate('/');
          } else {
            alert("Record not created successfully");
          }
        })
        .catch((err) => console.log(err));
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#243c5a]">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <input
              className="w-full p-3 border rounded-md bg-[#F6F6F6] focus:bg-white focus:border-2 focus:outline-none"
              type="text"
              placeholder="Firstname"
              required
              name="firstname"
              onChange={handleInput}
            />
          </div>
          <div>
            <input
              className="w-full p-3 border rounded-md bg-[#F6F6F6] focus:bg-white focus:border-2 focus:outline-none"
              type="lastname"
              placeholder="Lastname"
              required
              name="lastname"
              onChange={handleInput}
            />
          </div>
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
        
          <button
            type="submit"
            className="w-full p-3 bg-[#243c5a] text-white font-bold rounded-md"
          >
           Sign Up
          </button>
        </form>
        <div className="text-center mt-6">
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-[#243c5a]">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

