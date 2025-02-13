import { apiSlice } from "@/redux/features/api/apiSlice";
import { setProfileInfo } from "./userSlice";

export const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    personalInfo: builder.query({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
      providesTags: [],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // pessimistic cache update
        try {
          const { data: userPersonalInfo } = await queryFulfilled;
          // update get tasks cache, when new task is added
          dispatch(setProfileInfo(userPersonalInfo));
        } catch (err) {
          console.log(err);
        }
      },
    }),

  }),
});

export const { usePersonalInfoQuery, } = commonApiSlice;
