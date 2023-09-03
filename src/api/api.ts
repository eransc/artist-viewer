import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// consolidate into one import with index.ts export
import { ArtWork } from "./types/ArtWork";
import { Pagination } from "./types/Pagination";

interface ArtWorkResponse {
  data: ArtWork[];
  pagination: Pagination;
}

interface GetArtworksParams {
  page: number;
  limit: number;
}

interface GetArtworksSearchParams {
  page: number;
  limit: number;
  q: string;
}

// Constant fields that you always want to query
const constantFields = [
  "id",
  "title",
  "image_id",
  "artist_display",
  "date_display",
  "main_reference_number",
];

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.artic.edu/api/v1" }),
  endpoints: (builder) => ({
    getArtworks: builder.query<ArtWorkResponse, GetArtworksParams>({
      query: (params) => {
        const queryString = new URLSearchParams({
          page: params.page.toString(),
          limit: params.limit.toString(),
          fields: constantFields.join(","),
        }).toString();

        return `/artworks?${queryString}`;
      },
      transformResponse: (response: {
        data: ArtWork[];
        pagination: Pagination;
      }) => {
        return { data: response.data, pagination: response.pagination };
      },
    }),
    getArtworkById: builder.query<ArtWork, string>({
      query: (id: string) => `/artworks/${id}`,
      transformResponse: async (response: { data: ArtWork }) => {
        return response.data;
      },
    }),
    searchArtworks: builder.query<ArtWorkResponse, GetArtworksSearchParams>({
      query: (params) => {
        const queryString = new URLSearchParams({
          page: params.page.toString(),
          limit: params.limit.toString(),
          fields: constantFields.join(","),
          q: params.q,
        }).toString();

        return `/artworks/search?${queryString}`;
      },
      transformResponse: (response: {
        data: ArtWork[];
        pagination: Pagination;
      }) => {
        return { data: response.data, pagination: response.pagination };
      },
    }),
  }),
});

export const {
  useGetArtworksQuery,
  useLazyGetArtworksQuery,
  useGetArtworkByIdQuery,
  useSearchArtworksQuery,
  useLazySearchArtworksQuery,
} = api;
