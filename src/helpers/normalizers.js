export const normalizeResponseErrors = (response) => {
    return response.errors.length ? response.errors : [response.message];
}