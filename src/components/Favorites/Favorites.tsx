import React from "react";
import ArtWorkItem from "../ArtWorkList/ArtWorkItem"; // Adjust the import path as needed
import { iiif_url } from "../../cosntants"; // Adjust the import path as needed
import { ArtWork } from "@/api/types/ArtWork"; // Adjust the import path as needed
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Import your Redux store

const FavoriteArtWorks: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Favorite Artworks</h2>
      </div>

      {favorites.length === 0 ? (
        <p>No favorite artworks found.</p>
      ) : (
        <ul className="list-disc list-inside">
          {favorites.map((artwork: ArtWork, index: number) => (
            <ArtWorkItem artwork={artwork} iiif_url={iiif_url} key={index} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteArtWorks;
