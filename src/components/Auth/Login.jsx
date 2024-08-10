import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const {isLoading, authMessage, status, login} = useAuth()
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!email) {
      formErrors.email = "email is required";
    }
    if (!password) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const data = {
        email,
        password
      }
      login(data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <p className={`mb-4 ${status == 'success' ? 'text-green-500' : 'text-red-500'}`}>{authMessage} </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder='Enter you email'
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className={`${isLoading ? 'bg-loadingButton' : 'bg-orange'}  w-full bg-orange text-white py-2 rounded-md hover:bg-darkOrange focus:outline-none focus:ring-2 focus:ring-orange flex gap-2 justify-center items-center`}
            >
              <div className={`spinner-grow size-6 ${isLoading ? 'block' : 'hidden'} `} role="status">
                <span className="visually-hidden">...</span>
              </div>
              <span>Login</span>
            </button>
          </div>
        </form>

        <p className='text-sm mt-4 block'>Are you new? <Link to={'/signup'} className='text-orange'>Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
