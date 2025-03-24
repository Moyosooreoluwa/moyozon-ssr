// export const getError = (error) => {
//     return error.response && error.response.data.message
//       ? error.response.data.message
//       : error.message;
//   };

import axios from 'axios';

export const getError = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response && error.response.data) {
    // Assuming the API error response has a 'message' field
    return (
      (error.response.data as { message?: string }).message || error.message
    );
  } else if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};
