import { Fetcher } from '../helpers/fetcher'

export const Login = async (creds) => {
    return await Fetcher(
        creds,
        '/login',
        "POST"
      );
}

//
export const SignUp = async (creds) => {
  return await Fetcher(
      creds,
      '/signup',
      "POST"
    );
}

//
export const ForgotPassword = async (body) => {
  return await Fetcher(
      body,
      '/forgot',
      "POST"
    );
}

//
export const getUserInfo = async () => {
  return await Fetcher(
      undefined,
      '/getInfo',
      "POST"
    );
}
