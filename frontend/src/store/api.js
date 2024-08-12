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
      query: (language = 'en') => ({
        url: routes.getPopularEmbroidery(),
        params: { language },
      }),
    }),
    getEmbroideryById: builder.query({
      query: ({ id, language = 'en' }) => ({
        url: routes.getEmbroidery(id),
        params: { language },
      }),
    }),
    getEmbroideryList: builder.query({
      query: ({ page = 1, limit = 20, language = 'en' }) => ({
        url: routes.getEmbroideriesList(),
        params: { page, limit, language },
      }),
    }),
    getEmbroideryByCategory: builder.query({
      query: ({ categoryId, page = 1, limit = 20, language = 'en' }) => ({
        url: routes.getEmbroideriesByCategory(categoryId),
        params: { page, limit, language },
      }),
    }),
    uploadEmbroidery: builder.mutation({
      query: (embroideryData) => ({
        url: routes.uploadEmbroidery(),
        method: 'POST',
        body: embroideryData,
      }),
    }),
    getCategories: builder.query({
      query: (language = 'en') => ({
        url: routes.getCategories(),
        params: { language },
      }),
    }),
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: routes.uploadCategory(),
        method: 'POST',
        params: categoryData,
      }),
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

export const {
  useGetPopularEmbroideryQuery,
  useGetEmbroideryByIdQuery,
  useGetEmbroideryListQuery,
  useGetEmbroideryByCategoryQuery,
  useUploadEmbroideryMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useCreateUserMutation,
  useLoginUserMutation,
  useGetPurchasesQuery,
  useGetUserDataQuery,
  useUpdateUsernameMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} = api;
export default api;
