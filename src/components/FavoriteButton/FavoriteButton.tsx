import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArtWork } from "@/api/types/ArtWork";
import { RootState } from "../../store/store";
import { addFavorite, removeFavorite } from "../../store/slices/favoriteSlice";

interface FavoriteButtonProps {
  artItem: ArtWork;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ artItem }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  const isFavorite = favorites.some((favorite) => favorite.id === artItem.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(artItem.id));
    } else {
      dispatch(addFavorite(artItem));
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-1 text-sm rounded ${
        isFavorite ? "bg-red-500" : "bg-gray-300"
      } hover:bg-red-400`}
      aria-pressed={isFavorite}
    >
      {isFavorite ? "Unfavorite" : "Favorite"}
    </button>
  );
};

export default FavoriteButton;
