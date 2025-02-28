import baseApi from '../../../services/baseApi';

const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }),
        }),

        signup: builder.mutation({
            query: (userData) => ({
                headers: {
                    "Content-Type": "application/json"
                },
                url: "/auth/signup",
                method: "POST",
                body: userData,
            }),
        }),
        otpGenerator: builder.mutation({
            query: (email) => ({
                url: "/auth/generateotp",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: { email },
            }),
        }),

    }),
});

export const { useLoginMutation, useSignupMutation, useOtpGeneratorMutation } = homeApi;
export default homeApi;
