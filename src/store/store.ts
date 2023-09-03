// store.ts

import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./slices/favoriteSlice";
import { api } from "../api/api";
import { loadInitialFavorites } from "./slices/favoriteSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  favorites: favoriteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

const store = setupStore();

// Load initial favorites from local storage
const favoritesFromStorage = localStorage.getItem("favorites");
if (favoritesFromStorage) {
  store.dispatch(loadInitialFavorites(JSON.parse(favoritesFromStorage)));
}

export default store;
