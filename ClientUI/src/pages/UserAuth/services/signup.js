import baseApi from '../../../services/baseApi';

const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHome: builder.query({
            query: () => "home",
        }),
    }),
});

export const { useGetHomeQuery } = homeApi;
export default homeApi;
