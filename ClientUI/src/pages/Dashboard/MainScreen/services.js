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
        createnote: builder.mutation({
            query: (data) => ({
                url: "/dashboard/createnote",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: data,
            }),
        }),
        deletenote: builder.mutation({
            query: (id) => ({
                url: `/dashboard/deletenote?id=${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useDashboardstatsQuery,
    useCreatenoteMutation,
    useDeletenoteMutation
} = dashboardApi;

export default dashboardApi;
