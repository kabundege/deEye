import { Fetcher } from '../helpers/fetcher'

export const getFirstFeaturedVideo = async () => {
  return await Fetcher(
    undefined,
    `/video/main/ft?type=movie`,
    "GET"
  );
};

export const getSecondFeaturedVideo = async () => {
  return await Fetcher(
    undefined,
    `/video/second/ft?type=movie`,
    "GET"
  );
};

export const getPopularVideos = async (offset, limit) => {
  return await Fetcher(
    undefined,
    `/video/sort/pop?offset=${offset}&&limit=${limit}&&type=movie`,
    "GET"
  );
};

export const getNewVideos = async (offset, limit) => {
  return await Fetcher(
    undefined,
    `/video/arrivals?offset=${offset}&&limit=${limit}&&type=movie`,
    "GET"
  );
};

export const getTrendingVideos = async (offset, limit) => {
  return await Fetcher(
    undefined,
    `/video/sort/trend?offset=${offset}&&limit=${limit}&&type=movie`,
    "GET"
  );
};

