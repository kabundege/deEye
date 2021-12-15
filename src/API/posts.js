import { Fetcher } from '../helpers/fetcher'

export const createPost = async (creds) => {
  console.log(creds);
  return await Fetcher(
      creds,
      '/posts',
      "POST"
    );
}

//
export const getAllPost = async (creds) => {
  return await Fetcher(
      creds,
      '/posts',
      "GET"
    );
}

//
export const ChangeStatus = async (id,body) => {
  return await Fetcher(
      body,
      `/posts/${id}`,
      "PATCH"
    );
}


