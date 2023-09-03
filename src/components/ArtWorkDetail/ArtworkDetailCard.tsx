import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetArtworkByIdQuery } from "../../api/api";
import { iiif_url } from "../../cosntants";
import Loader from "../Loader/Loader";
import { CaretDown, Star } from "phosphor-react";
import FavoriteButton from "components/FavoriteButton/FavoriteButton";

const ArtworkDetailCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: artwork, isLoading, isError } = useGetArtworkByIdQuery(id);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching artwork</div>;

  const goBack = () => {
    navigate(-1);
  };

  const {
    title,
    image_id,
    artist_display: artistDisplay,
    department_title: departmentTitle,
    date_display: dateDisplay,
    medium_display: mediumDisplay,
    dimensions,
    place_of_origin: placeOfOrigin,
    artwork_type_title: artworkTypeTitle,
    credit_line: creditLine,
    thumbnail: { lqip: thumbnailImage },
  } = artwork;

  const iiifUrl = image_id
    ? `${iiif_url}/${image_id}/full/843,/0/default.jpg`
    : "https://via.placeholder.com/150?text=Art+Not+Available"; // This is a placeholder image

  return (
    <div className="relative">
      <div className="flex justify-between w-full mb-4 md:w-1/2">
        <button
          onClick={goBack}
          className="p-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Go Back
        </button>
        <FavoriteButton artItem={artwork} />
      </div>

      <div className="w-full p-4 bg-white rounded-lg shadow-lg md:w-1/2">
        <img
          src={iiifUrl}
          alt={artwork.title}
          className="mr-2 rounded-full image-size"
        />
        <h1 className="mb-2 text-xl font-semibold">
          <span className="font-normal text-gray-600">Title: </span>
          {title}
        </h1>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Artist: </span>
          {artistDisplay}
        </p>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Department: </span>
          {departmentTitle}
        </p>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Date: </span>
          {dateDisplay}
        </p>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Medium: </span>
          {mediumDisplay}
        </p>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Dimensions: </span>
          {dimensions}
        </p>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Place of Origin: </span>
          {placeOfOrigin}
        </p>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Artwork Type: </span>
          {artworkTypeTitle}
        </p>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Credit Line: </span>
          {creditLine}
        </p>
      </div>
    </div>
  );
};

export default ArtworkDetailCard;
