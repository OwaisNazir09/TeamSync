import baseApi from '../../../services/baseApi';

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        Dashboardstats: builder.query({
            query: () => ({
                url: "/dashboard/dashboardstats", 
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include" 
            }),
        }),
    }),
});

export const { useDashboardstatsQuery } = dashboardApi;
export default dashboardApi;
