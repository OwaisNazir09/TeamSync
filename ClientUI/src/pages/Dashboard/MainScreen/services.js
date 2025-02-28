import baseApi from '../../../services/baseApi';

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        Dashboardstats: builder.query({
            query: () => ({
<<<<<<< HEAD
                url: "/dashboard/dashboardstats", 
=======
                url: "/dashboard/dashboardstats",
>>>>>>> 1511294
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
<<<<<<< HEAD
                credentials: "include" 
            }),
        }),
    }),
});

export const { useDashboardstatsQuery } = dashboardApi;
=======
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

>>>>>>> 1511294
export default dashboardApi;
