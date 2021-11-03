import { Fetcher } from '../helpers/fetcher'

export const getVideosByCategory = async (category) => {
  return await Fetcher(
    undefined,
    `/video/sort/category?q=${category}`,
    "GET"
  );
};

export const VideosSearch = async (query, offset) => {
  return await Fetcher(
    undefined,
    `/video/search?q=${query}&offset=${offset}`,
    "GET"
  );
};

