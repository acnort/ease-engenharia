import axios from 'axios'

export const effect = (effect, _action) => axios(effect);
export const discard = (error, _action, _retries) => {
  const { request, response } = error;
  if (!request) throw error; // There was an error creating the request
  if (!response) return false; // There was no response
  return response.status >= 400 && response.status < 500;
};

export const baseURL = 'http://192.168.0.5:3000'

export default axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})
