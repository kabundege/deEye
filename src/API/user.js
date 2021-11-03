import { Fetcher } from '../helpers/fetcher'

export const Login = async (creds) => {
    return await Fetcher(
        creds,
        '/auth/login',
        "POST"
      );
}

//
export const Logout = async (body) => {
  return await Fetcher(
      body,
      '/auth/logout',
      "PUT"
    );
}
//
export const ForgotPassword = async (body) => {
  return await Fetcher(
      body,
      '/auth/forgot-password',
      "POST"
    );
}

//
export const getUserInfo = async () => {
  return await Fetcher(
      undefined,
      '/auth/particular',
      "GET"
    );
}

//
export const deleteAccount = async () => {
  return await Fetcher(
      undefined,
      '/auth/my-account/delete',
      "DELETE"
    );
}

//
export const activatePayment = async () => {
  return await Fetcher(
      undefined,
      '/auth/my-account/activate',
      "PUT"
    );
}

//
export const updateAccount = async (body) => {
  return await Fetcher(
      body,
      '/auth/update',
      "PUT"
    );
}
