import { Fetcher } from '../helpers/fetcher'

export const createComment = async (creds) => {
    return await Fetcher(
        creds,
        '/comments',
        "POST"
      );
}

//
export const getAllComments = async (creds) => {
  return await Fetcher(
      creds,
      '/comments',
      "GET"
    );
}


