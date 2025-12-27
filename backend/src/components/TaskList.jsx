import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch tasks from the backend API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks'); // Backend API endpoint
        setTasks(response.data); // Set fetched tasks into state
        setLoading(false); // Turn off loading state
      } catch (err) {
        setError('Failed to fetch tasks.'); // Set error message in state
        setLoading(false); // Turn off loading state
      }
    };

    fetchTasks(); // Call the fetch function
  }, []);

  // Rendering the Component
  return (
    <div>
      <h1>Task List</h1>
      {loading && <p>Loading tasks...</p>} {/* Display loading state */}
      {error && <p>{error}</p>} {/* Display error message */}

      {/* Display tasks if they are available */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description} (Status: {task.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;