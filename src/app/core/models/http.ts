export interface HttpCustomResponse<T> {
    data: T,
    status: number,
    message: string
}


export interface HttpPagedResponse<T> {
    data: T,
    pageNumber: number,
    pageSize: number,
    totalCount: number,
}