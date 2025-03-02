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
        startAttendance: builder.mutation({
            query: () => ({
                url: '/dashboard/startattendance',
                method: 'PUT',
            }),
        }),
        startBreak: builder.mutation({
            query: () => ({
                url: '/dashboard/startbreak',
                method: 'PUT',
            }),
        }),
        endBreak: builder.mutation({
            query: () => ({
                url: '/dashboard/endbreak',
                method: 'PUT',
            }),
        }),
        endAttendance: builder.mutation({
            query: () => ({
                url: '/dashboard/endattendance',
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useDashboardstatsQuery,
    useCreatenoteMutation,
    useDeletenoteMutation,
    useTaskUpdateMutation,
    useStartAttendanceMutation,
    useStartBreakMutation,
    useEndBreakMutation,
    useEndAttendanceMutation,
} = dashboardApi;

export default dashboardApi;
