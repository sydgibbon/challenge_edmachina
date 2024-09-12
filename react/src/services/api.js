// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Get subjects for the selects
export const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/subjects/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
};

export const fetchCareers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/careers/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
};
  
// Post lead data
export const postLead = async (lead_obj) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/leads/`, lead_obj);
    return response.data;
  } catch (error) {
    console.error('Error enrolling lead:', error);
    throw error;
  }
};

// Post subject data
export const postLeadSubject = async (leads_subjects_obj) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/leads_subjects/`, leads_subjects_obj);
      return response.data;
    } catch (error) {
      console.error('Error enrolling student:', error);
      throw error;
    }
};
