import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes/routes.js';

const baseQuery = fetchBaseQuery({
  baseUrl: routes.defaultApiPath(),
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getPopularEmbroidery: builder.query({
      query: () => routes.getPopularEmbroidery(),
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: routes.signUp(),
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
});

export const { useGetPopularEmbroideryQuery } = api;
export default api;
