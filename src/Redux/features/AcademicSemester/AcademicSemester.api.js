import { baseApi } from "../../api"

const AcademicSemesterApi = baseApi.injectEndpoints({
    endpoints: build => ({
        // Add academic semester endpoint
        addAcademicSemester: build.mutation({
            query: (body) => ({
                url: `/academic-semesters/create-academic-semester`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['academic-semester']
        }),

        // get academic-semester endpoint
        getAcademicSemester: build.query({
            query: (params) => ({
                url: '/academic-semesters',
                method: 'GET',
                params
            }),
            providesTags: ['academic-semester']
        })
    })
})

export const { useAddAcademicSemesterMutation, useGetAcademicSemesterQuery } = AcademicSemesterApi