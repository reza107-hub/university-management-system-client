import { baseApi } from '../../api'

const BatchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Add batch endpoint
    addBatch: build.mutation({
      query: (body) => ({
        url: `/batch/create-batch`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['batch'],
    }),
    mergeSection: build.mutation({
      query: (body) => ({
        url: `/batch/mergeSection`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['batch'],
    }),
    // update batch endpoint
    updateBatch: build.mutation({
      query: ({ id, body }) => ({
        url: `/batch/update-batch/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['batch'],
    }),

    // get batch endpoint
    getBatch: build.query({
      query: () => ({
        url: '/batch/get-all-batch',
        method: 'GET',
      }),
      providesTags: ['batch'],
    }),

    getAllSection: build.query({
      query: () => ({
        url: `/batch/get-all-section`,
        method: 'GET',
      }),
      providesTags: ['batch'],
    }),

    getSingleSection: build.query({
      query: (id) => ({
        url: `/batch/get-single-section/${id}`,
        method: 'GET',
      }),
      providesTags: ['batch'],
    })
  }),
})

export const { useAddBatchMutation, useGetBatchQuery, useUpdateBatchMutation, useGetAllSectionQuery, useGetSingleSectionQuery, useMergeSectionMutation } =
  BatchApi
