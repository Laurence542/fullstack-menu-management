import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',  // Your Django server
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default apiClient;
