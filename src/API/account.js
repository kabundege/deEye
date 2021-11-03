import { Fetcher } from '../helpers/fetcher'

//
export const getAllPlans = async () => {
    return await Fetcher(
        undefined,
        '/plan',
        "GET"
      );
  }

///auth/update
export const changeUserPlan = async (body) => {
    return await Fetcher(
        body,
        '/auth/update',
        "PUT"
      );
  }

export const handlerSubscription = async (type) => {
  const link = type === 'cancel' ? '/trans/cancel-subscription' : '/trans/reactivate-subscription';
  return await Fetcher(
    undefined,
    `/trans/${type}-subscription`,
    "PUT"
  )
}
