import { getTokens } from '@/lib';
import { commonApiSlice } from '@/redux/features/common/commonApiSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';

// In a custom hook or component
export function useInitialDataFetch() {
  const tokens = getTokens();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tokens.accessToken) {
      dispatch(
        commonApiSlice.endpoints.personalInfo.initiate(undefined)
      );
      // Add other initial fetches here
    }
  }, [tokens.accessToken, dispatch]);
}
