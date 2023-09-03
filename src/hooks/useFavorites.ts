import { ArtWork } from "api/types/ArtWork";
import { useState, useEffect } from "react";

type FavoriteItem = ArtWork;

function useFavorites(key: string, initialValue: FavoriteItem[] = []): {
  favorites: FavoriteItem[],
  addFavorite: (item: FavoriteItem) => void,
  removeFavorite: (item: FavoriteItem) => void
} {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favorites));
  }, [key, favorites]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites([...favorites, item]);
  };

  const removeFavorite = (itemToRemove: FavoriteItem) => {
    // Assumes that 'id' is a unique identifier for each FavoriteItem
    setFavorites(favorites.filter(item => item.id !== itemToRemove.id));
    console.log('Removing favorite: ', itemToRemove);  
};

  return {
    favorites,
    addFavorite,
    removeFavorite
  };
}

export default useFavorites;
