import { Fetcher } from '../helpers/fetcher'

export const getFirstFeaturedSerie = async() => {
    return await Fetcher(
      undefined,
      `/video/main/ft?type=serie`,
      "GET"
    );
  };
  

export const getSecondFeaturedSerie = async() => {
  return await Fetcher(
    undefined,
    `/video/second/ft?type=serie`,
    "GET"
  );
};

export const getPopularSeries = async(offset, limit) => {
  return await Fetcher(
    undefined,
    `/video/sort/pop?offset=${offset}&&limit=${limit}&&type=serie`,
    "GET"
  );
};

export const getNewSeries = async(offset, limit) => {
  return await Fetcher(
    undefined,
    `/video/arrivals?offset=${offset}&&limit=${limit}&&type=serie`,
    "GET"
  );
};

export const getTrendingSeries = async(offset, limit) => {
  return await Fetcher(
    undefined,
    `/video/sort/trend?offset=${offset}&&limit=${limit}&&type=serie`,
    "GET"
  );
};
  
export const getSerieDetails = async(id) => {
  return await Fetcher(
    undefined,
    `/series/single/season?s=1&id=${id}&&limit=1&offset=0`,
    "GET"
  );
};
