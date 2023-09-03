import React from "react";
import { Link } from "react-router-dom";
import { ArtWork } from "@/api/types/ArtWork";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

interface ArtWorkItemProps {
  artwork: ArtWork;
  iiif_url: string;
}

const ArtWorkItem: React.FC<ArtWorkItemProps> = ({ artwork, iiif_url }) => {
  const iiifUrl = artwork.image_id
    ? `${iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`
    : "https://via.placeholder.com/150?text=Art+Not+Available"; // Placeholder image

  return (
    <li className="flex items-center justify-between w-full mb-4">
      <div className="flex items-center">
        <img
          src={iiifUrl}
          alt={artwork.title}
          className="mr-2 rounded-full image-size"
        />
        {artwork.title && (
          <Link to={`/artwork-detail/${artwork.id}`}>{artwork.title}</Link>
        )}
      </div>
      <FavoriteButton artItem={artwork} />
    </li>
  );
};

export default ArtWorkItem;
