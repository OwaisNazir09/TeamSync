import baseApi from '../../../services/baseApi';

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        Dashboardstats: builder.query({
            query: () => ({
                url: "/dashboard/dashboardstats",
                method: "GET",
                credentials: "include"
            }),
        }),
        createnote: builder.mutation({
            query: (data) => ({
                url: "/dashboard/createnote",
                method: "POST",
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
        ProfileStats: builder.query({
            query: () => ({
                url: "/dashboard/user/profilestats",
                method: "GET",
                credentials: "include"
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: "/dashboard/user/update-profile",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
        }),
        updateEmployment: builder.mutation({
            query: (data) => ({
                url: "/dashboard/user/update-employment",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
        }),
        updateContact: builder.mutation({
            query: (data) => ({
                url: "/dashboard/user/update-contact",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
        }),

        // ✅ Admin Routes
        createTeam: builder.mutation({
            query: (data) => ({
                url: "/admin/createteam",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        deleteTeam: builder.mutation({
            query: (teamId) => ({
                url: `/admin/deleteteam`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
        addUserToTeam: builder.mutation({
            query: (data) => ({
                url: "/admin/team/addUser",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        removeUserFromTeam: builder.mutation({
            query: (data) => ({
                url: "/admin/team/deleteUser",
                method: "DELETE",
                credentials: "include",
                body: data,
            }),
        }),
        getTeamDetails: builder.query({
            query: () => ({
                url: "/admin/teamdetails",
                method: "GET",
                credentials: "include",
            }),
        }),
        createTask: builder.mutation({
            query: (data) => ({
                url: "/admin/createtask",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        createNotice: builder.mutation({
            query: (data) => ({
                url: "/admin/createnotice",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        updateTask: builder.mutation({
            query: (data) => ({
                url: "/admin/updatetask",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `/admin/deletetask?id=${taskId}`,
                method: "DELETE",
                credentials: "include",
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
    useProfileStatsQuery,
    useUpdateUserMutation,
    useUpdateEmploymentMutation,
    useUpdateContactMutation,

    useCreateTeamMutation,
    useDeleteTeamMutation,
    useAddUserToTeamMutation,
    useRemoveUserFromTeamMutation,
    useGetTeamDetailsQuery,
    useCreateTaskMutation,
    useCreateNoticeMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = dashboardApi;

export default dashboardApi;
