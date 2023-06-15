import { useState, useEffect } from 'react';
import axios from 'axios';

const ContainersPage = () => {
  const [containers, setContainers] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getContainers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET containers
  const getContainers = async () => {
    try {
      const response = await axios.get('/api/containers');
      setContainers(response.data.containers);
      setImages(response.data.images);
    } catch (error) {
      console.error(error);
    }
  };

  // Start container
  const startContainer = async (id) => {
    try {
      await axios.post(`/api/containers/${id}/start`);
      getContainers();
    } catch (error) {
      console.error(error);
    }
  };

  // Stop container
  const stopContainer = async (id) => {
    try {
      await axios.post(`/api/containers/${id}/stop`);
      getContainers();
    } catch (error) {
      console.error(error);
    }
  };

  // Remove container
  const removeContainer = async (id) => {
    try {
      await axios.post(`/api/containers/${id}/remove`);
      getContainers();
    } catch (error) {
      console.error(error);
    }
  };

  // Create container
  const createContainer = async (options) => {
    try {
      await axios.post('/api/containers/create', options);
      getContainers();
    } catch (error) {
      console.error(error);
    }
  };

  // Other functions...

  // Render containers page with containers and images data
  return <div>Containers Page</div>;
};

export default ContainersPage;
