import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
<<<<<<< HEAD
        baseUrl: 'https://teamsyncbackend.onrender.com/',
=======
        baseUrl: 'http://localhost:2860/',
>>>>>>> 1511294
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});

export default baseApi;
