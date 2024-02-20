import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  // State variables to store form data
  const navigate = useNavigate();
  const [productName, setName] = useState('');
  const [productDescription, setDescription] = useState('');
  const [maxActiveUsersCount, setMaxActiveUsersCount] = useState(0);
  const [validityInDays, setValidityInDays] = useState(0);
  const [maxAbsoluteDiscount, setMaxAbsoluteDiscount] = useState(0);
  const userEmail = localStorage.getItem('email');
  const [userId, setUserId] = useState('');
  const [features, setFeatures] = useState([]);
  const [featureValues, setFeatureValues] = useState({});
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
        
        setUserId(data);
        
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    }
    fetchUserId();
  }, []);


  useEffect(() => {
    async function fetchFeatures() {
      try {
        const response = await fetch('http://localhost:4000/v1/features/getFeatures');
        const data = await response.json();
        setFeatures(data);
        // Initialize featureValues with default values
        console.log(data);
        const defaultFeatureValues = {};
        data.forEach(feature => {
          defaultFeatureValues[feature.id] = ''; // Or set your default value here
        });
        setFeatureValues(defaultFeatureValues);
      } catch (error) {
        console.error('Failed to fetch features:', error);
      }
    }
    fetchFeatures();
  }, []);





  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('here',features);
    try {
      const response = await fetch('http://localhost:4000/v1/products/createProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, productDescription, maxActiveUsersCount, validityInDays, maxAbsoluteDiscount, userId, "features": featureValues, token})
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

  const handleFeatureChange = (featureId, value) => {
    setFeatureValues(prev => ({
      ...prev,
      [featureId]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700">Name:</label>
            <select
              id="productName"
              value={productName}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="">Select Name</option>
              <option value="Personal">Personal</option>
              <option value="Small Business">Small Business</option>
              <option value="Large Business">Large Business</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-gray-700">Description:</label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="maxActiveUsersCount" className="block text-gray-700">Max Active Users Count:</label>
            <select
              id="maxActiveUsersCount"
              value={maxActiveUsersCount}
              onChange={(e) => setMaxActiveUsersCount(parseInt(e.target.value))}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value={0}>Select Max Active Users Count</option>
              <option value={1}>1</option>
              <option value={10}>Less than 10</option>
              <option value={100}>Less than 100</option>
              <option value={1000}>Greater than 100</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="validityInDays" className="block text-gray-700">Validity in Days:</label>
            <select
              id="validityInDays"
              value={validityInDays}
              onChange={(e) => setValidityInDays(parseInt(e.target.value))}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value={0}>Select Validity in Days</option>
              <option value={30}>30</option>
              <option value={90}>90</option>
              <option value={365}>365</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="maxAbsoluteDiscount" className="block text-gray-700">Max Absolute Discount:</label>
            <input
              type="number"
              id="maxAbsoluteDiscount"
              value={maxAbsoluteDiscount}
              onChange={(e) => setMaxAbsoluteDiscount(parseInt(e.target.value))}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            {features.map((feature, index) => (
              <div key={feature._id}>
                <label htmlFor={feature.title} className="block text-gray-700">{feature.title}:</label>
                <input 
                  type="text"
                  list="featureValues"
                  id={feature.title}
                  value={feature.value}
                  onChange={(e) => handleFeatureChange(feature._id, e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
                <datalist id="featureValues">
                  <option value="true" />
                  <option value="false" />
                </datalist>
              </div>
            ))}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;

