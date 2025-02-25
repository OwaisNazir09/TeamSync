

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://teamsyncbackend.onrender.com/' }),
    endpoints: () => ({}),
});

export default baseApi;
