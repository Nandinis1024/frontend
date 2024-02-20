import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateFeatures() {
  // State variables to store form data
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userEmail = localStorage.getItem('email');
  const [userId, setUserId] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchUserId() {
      try {
        const response = await fetch('http://localhost:4000/v1/products/userId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });
        const data = await response.json();
        console.log(data);
        setUserId(data);
        console.log(userId);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    }
    fetchUserId();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/v1/features/createFeatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description, userId, token}),
      });
      console.log(response.status);
      if (response.status === 201) {
        console.log('Product Created:');
        navigate('/createFeatures');
      } else {
        console.error('failed:');
      }
    } catch (error) {
      console.error('failed:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Features</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Create Feature
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateFeatures;
