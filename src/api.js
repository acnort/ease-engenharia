import axios from 'axios'

export const effect = (effect, _action) => axios(effect);
export const discard = (error, _action, _retries) => {
  const { request, response } = error;
  if (!request) throw error; // There was an error creating the request
  if (!response) return false; // There was no response
  return 400 <= response.status && response.status < 500;
};

export const baseURL = 'https://api.github.com'

export default axios.create({
  baseURL
})
