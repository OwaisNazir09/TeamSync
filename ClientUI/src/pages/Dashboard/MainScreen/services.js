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
        TaskUpdate: builder.mutation({
            query: ({ id, status }) => ({
                url: `/dashboard/updatetask`, 
                method: "PUT", 
                credentials: "include",
                body: { id, status },
            }),
        }),
    }),
});

export const {
    useDashboardstatsQuery,
    useCreatenoteMutation,
    useDeletenoteMutation,
    useTaskUpdateMutation
} = dashboardApi;

export default dashboardApi;
