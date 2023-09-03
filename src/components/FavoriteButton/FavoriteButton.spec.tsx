import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../../store/slices/favoriteSlice";
import FavoriteButton from "./FavoriteButton";
import { ArtWork } from "@/api/types/ArtWork";

const artItem: any = {
  id: 1,
  // ...other properties
};

const setup = (initialState: ArtWork[] = []) => {
  const store = configureStore({
    reducer: {
      favorites: favoriteReducer,
    },
    preloadedState: {
      favorites: initialState,
    },
  });

  return render(
    <Provider store={store}>
      <FavoriteButton artItem={artItem} />
    </Provider>
  );
};

test("Favorite button renders successfully", () => {
  setup();
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("Label of the Favorite button is calculated correctly when not a favorite", () => {
  setup();
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Favorite");
});

test("Label of the Favorite button is calculated correctly when is a favorite", () => {
  setup([artItem]);
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Unfavorite");
});
