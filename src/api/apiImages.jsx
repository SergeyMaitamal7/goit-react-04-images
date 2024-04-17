import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '29175457-ea8e2c93dbfac842acac0bec2';

export async function apiImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
  );
  return response.data;
}
