import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Signup = ({onClose}) => {
  const { isLoading, authMessage, status, signup } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const fullNamePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
  const passwordStrength = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validPhoneNumber =
    /^(?:\+?234|0)?(70[1-9]|80[1-9]|81[0-9]|90[1-9]|91[0-9])[0-9]{7}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      password.trim() === "" ||
      email.trim() === "" ||
      phoneNumber.trim() === "" ||
      gender.trim() === "" ||
      address.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }

    if (!passwordStrength.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }
    if (!validEmail.test(email)) {
      setError("Provide a valid email address.");
      return;
    }

    if (!fullNamePattern.test(name)) {
      setError("Provide a valid full name.");
      return;
    }

    if (!validPhoneNumber.test(phoneNumber)) {
      setError("Provide a valid phone number.");
      return;
    }

    const data = {
      name,
      email,
      password,
      phoneNumber,
      gender,
      address,
    };

    setError("");
    signup(data);
    onClose()
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <p className={`mb-4 ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>{authMessage}</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              placeholder="John doe"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="08078987876"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" >Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="123 Main St, Abeokuta, Ogun State"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="********"
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full ${isLoading ? 'bg-loadingButton' : 'bg-orange'} hover:bg-darkOrange text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange flex gap-2 justify-center items-center`}
            >
              <div className={`spinner-grow size-6 ${isLoading ? 'block' : 'hidden'}`} role="status">
                <span className="visually-hidden">...</span>
              </div>
              <span>Signup</span>
            </button>
          </div>
        </form>

        <p className="text-sm mt-4 block">
          Have an account?{" "}
          <Link to={"/login"} className="text-orange">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
