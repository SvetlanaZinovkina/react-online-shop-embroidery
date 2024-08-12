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
    loginUser: builder.mutation({
      query: (userData) => ({
        url: routes.login(),
        method: 'POST',
        body: userData,
      }),
    }),
    getPurchases: builder.query({
      query: () => routes.purchases(),
    }),
    getUserData: builder.query({
      query: () => routes.getUserData(),
    }),
    updateUsername: builder.mutation({
      query: (username) => ({
        url: routes.updateUsername(),
        method: 'PUT',
        body: { username },
      }),
    }),
    updateEmail: builder.mutation({
      query: (email) => ({
        url: routes.updateEmail(),
        method: 'PUT',
        body: { email },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: routes.updatePassword(),
        method: 'PUT',
        body: { oldPassword, newPassword },
      }),
    }),
  }),
});

export const { useGetPopularEmbroideryQuery } = api;
export default api;
