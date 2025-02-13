import { apiSlice } from '@/redux/features/api/apiSlice';
interface CacheData {
  // Add other cache fields if needed
  [key: string]: unknown;
}

export const fileUploaderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFiles: builder.query({
      query: () => '/files?fileManager=true',
      providesTags: ['Files'],
    }),

    uploadFile: builder.mutation({
      query: (data) => ({
        url: '/upload-file',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: responseData } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              'getAllFiles',
              {},
              (draft: CacheData[]) => {
                // Ensure draft is an array if not yet initialized
                if (!Array.isArray(draft)) {
                  return [responseData]; // Initialize as a new array with the response data
                }
                draft.push(responseData); // Append to the existing array
              }
            )
          );
        } catch (error) {
          console.warn('Error during file upload:', error);
        }
      },
    }),

    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/files?id=${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Files'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllFilesQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
} = fileUploaderApiSlice;
