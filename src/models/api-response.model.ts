export default interface IApiResponseModel<T> {
	data: T | null | undefined;
	error: string | null | undefined;
	success: boolean;
}
