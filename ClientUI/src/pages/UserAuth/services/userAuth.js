import baseApi from '../../../services/baseApi';

const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials,
            }),
        }),
        signup: builder.mutation({
            query: (userData) => ({
                url: "/auth/signup",
                method: "POST",
                body: userData,
            }),
        }),

    }),
});

export const { useLoginMutation, useSignupMutation } = homeApi;
export default homeApi;
