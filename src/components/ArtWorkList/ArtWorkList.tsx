import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useLazyGetArtworksQuery,
  useLazySearchArtworksQuery,
} from "../../api/api";
import "./ArtWorkList.css";
import Pager from "../Pager/Pager";
import SearchBox from "../SearchBox/SearchBox";
import ArtWorkItem from "./ArtWorkItem";
import Loader from "../Loader/Loader";
import { iiif_url } from "../../cosntants";
import { ArtWork } from "api/types/ArtWork";

// loading indicator not working
// alias /@components to /src/components
// add a new route for /artwork-detail/:id
// add a new component for ArtWorkDetail
// search value not persisted
// errors management
// testing

const ArtWorkList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [
    triggerGetArtworks,
    { data: artworksData, isLoading: isLoadingArtworks, isSuccess },
  ] = useLazyGetArtworksQuery();
  const [
    triggerSearchArtworks,
    { data: searchedArtworks, isLoading: isLoadingSearch },
  ] = useLazySearchArtworksQuery();

  useEffect(() => {
    if (searchQuery) {
      triggerSearchArtworks({
        page: currentPage,
        limit: itemsPerPage,
        q: searchQuery,
      });
    } else {
      triggerGetArtworks({ page: currentPage, limit: itemsPerPage });
    }
  }, [
    currentPage,
    itemsPerPage,
    searchQuery,
    triggerGetArtworks,
    triggerSearchArtworks,
  ]);

  const handleSearch = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
  
    // Reset page to 1 when a new search query is set
    if (newSearchQuery !== searchQuery) {
      setCurrentPage(1);
    }
  };

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const isLoading = isLoadingArtworks || isLoadingSearch;

  const jumpToPage = (page: number) => {
    setCurrentPage(page);
  };

  let dataToDisplay: ArtWork[] = [];
  let pagination = null;
  if (searchQuery && searchedArtworks) {
    dataToDisplay = searchedArtworks.data ?? [];
    pagination = searchedArtworks.pagination;
  } else if (artworksData) {
    dataToDisplay = artworksData.data ?? [];
    pagination = artworksData.pagination;
  }

  if (isSuccess) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Artworks</h2>
          <SearchBox onSearch={handleSearch} />
          <div>
            <span className="mr-2">Items per page:</span>
            <select
              className="leading-tight text-gray-700 border rounded-lg cursor-pointer focus:outline-none focus:shadow-outline"
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={35}>35</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {dataToDisplay.length > 0 ? (
              <ul className="list-disc list-inside">
                {dataToDisplay.map((artwork, index) => {
                  return (
                    <ArtWorkItem
                      artwork={artwork}
                      iiif_url={iiif_url}
                      key={index}
                    />
                  );
                })}
              </ul>
            ) : (
              <p>Data is not available.</p>
            )}
            <Pager
              currentPage={currentPage}
              total_pages={pagination ? pagination.total_pages : 1}
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              jumpToPage={jumpToPage} 
              isDisabled={isLoading}
            />
          </>
        )}
      </div>
    );
  }
};

export default ArtWorkList;
