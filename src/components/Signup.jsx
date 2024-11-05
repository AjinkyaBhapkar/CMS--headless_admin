import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const isFormValid = () => {
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      passwordMatch
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/public/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        setAlert({ message: 'Signup successful!', type: 'success', visible: true });
        setTimeout(() => {
          navigate('/create-project');
        }, 2000);
      } else {
        setAlert({ message: `Signup failed: ${response.data.message || 'Unknown error'}`, type: 'danger', visible: true });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred.';
      setAlert({ message: `Signup failed: ${errorMessage}`, type: 'danger', visible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen my-5">
      <Alert
        message={alert.message}
        type={alert.type}
        visible={alert.visible}
        onClose={() => setAlert({ ...alert, visible: false })}
      />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Get started</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type='text'
              id="password"
              className="border rounded-md px-3 py-2 w-full pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <div className="flex">
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="border rounded-md px-3 py-2 w-full pr-10"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 -ml-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!passwordMatch && (
              <p className="text-red-500 text-sm mt-2">Passwords do not match</p>
            )}
            {passwordMatch && confirmPassword && (
              <p className="text-green-500 text-sm mt-2">Passwords match</p>
            )}
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-md w-full hover:bg-blue-600 ${!isFormValid() || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormValid() || loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;