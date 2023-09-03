import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArtWork } from "@/api/types/ArtWork";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as ArtWork[],
  reducers: {
    loadInitialFavorites: (state, action: PayloadAction<ArtWork[]>) => {
      return action.payload;
    },
    addFavorite: (state, action: PayloadAction<ArtWork>) => {
      return [...state, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      return state.filter((artwork) => artwork.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite, loadInitialFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
