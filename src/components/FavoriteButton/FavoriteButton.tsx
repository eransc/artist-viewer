import React from "react";
import useFavorites from "../../hooks/useFavorites"; // Adjust the import path as needed
import { ArtWork } from "api/types/ArtWork";

interface FavoriteButtonProps {
  artItem: ArtWork;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ artItem }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites("favorites");
  
  // Check if the artItem is a favorite based on its 'id'
  const isFavorite = favorites.some(favorite => favorite.id === artItem.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(artItem);
    } else {
      addFavorite(artItem);
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
