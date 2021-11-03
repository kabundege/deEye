import { Fetcher } from '../helpers/fetcher'

//
export const getAllTrailers = async (id) => {
    return await Fetcher(
        undefined,
        `/trailer/sort/video?id=${id}`,
        "GET"
    );
}