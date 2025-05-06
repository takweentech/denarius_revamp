export interface HttpCustomResponse<T> {
    data: T,
    status: number,
    message: string
}