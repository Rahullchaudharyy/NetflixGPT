import { GoogleGenerativeAI } from '@google/generative-ai';

const MOVIE_API_URL = process.env.REACT_APP_MOVIE_API_BASE_URL;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_MOVIE_API_BEARER_TOKEN}`,
  },
};

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GEN_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fetchMovieData = async (endpoint) => {
  try {
    const response = await fetch(`${MOVIE_API_URL}${endpoint}`, API_OPTIONS);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
};

const generateGeminiContent = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating Gemini content:', error);
  }
};

export { API_OPTIONS, fetchMovieData, generateGeminiContent };
