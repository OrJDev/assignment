import { AxiosError } from "axios";

export function convertError(e: any): string {
    if (e instanceof AxiosError) {
        if (e.response?.data) {
            let eMessage = e.response.data.error['message']
            return eMessage ?? 'Something Went Wrong'
        } else {
            return e.message
        }
    } else {
        if (typeof e === 'string') {
            return e;
        } else {
            return 'Something Went Wrong'
        }
    }
}