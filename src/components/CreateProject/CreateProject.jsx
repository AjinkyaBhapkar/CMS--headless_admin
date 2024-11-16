import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../Alert'; // Assuming Alert is the existing alert component

const CreateProject = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-z0-9]/gi, '').toLowerCase();
    setProjectName(filteredValue);
    setError(''); // Reset error when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setIsLoading(true);
    setError('');
    setAlertMessage('');
    setAlertVisible(false);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/create-project`, {
        name: projectName,
      });

      if (response.status === 201) {
        setAlertMessage('Project created successfully');
        setAlertType('success');
        setAlertVisible(true);
        onSubmit(projectName);
        setProjectName('');
      } else if (response.status === 409) {
        setError('Project name already exists');
      } else {
        setAlertMessage('Something went wrong');
        setAlertType('danger');
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage('Something went wrong');
      setAlertType('danger');
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="inline-block bg-white rounded-xl border border-gray-100 
        shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] 
        hover:shadow-[rgba(17,_17,_26,_0.1)_0px_8px_24px,_rgba(17,_17,_26,_0.1)_0px_16px_56px] 
        transition-shadow duration-300 ease-in-out">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Header */}
          <h2 className="text-2xl font-light text-gray-800 text-center">
            Get started by creating a new project
          </h2>

          {/* Input Field */}
          <div>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-100'} rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-100 
                transition-all duration-200 placeholder:text-gray-400
                shadow-[inset_0px_2px_4px_rgba(0,0,0,0.02)]`}
              placeholder="Enter project name"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Create Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg 
                hover:bg-blue-700 hover:shadow-[0_8px_16px_rgba(59,130,246,0.2)]
                transition-all duration-200 
                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                shadow-[0_4px_12px_rgba(59,130,246,0.1)]"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
        <Alert
          message={alertMessage}
          type={alertType}
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
        />
      </div>
    </div>
  );
};

export default CreateProject;