import React from 'react';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import StationLineSearch from '../components/StationLineSearch';
import FeaturedProperties from '../components/FeaturedProperties';
import ServiceFeatures from '../components/ServiceFeatures';
import PopularAreas from '../components/PopularAreas';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStationLineSearch = (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    navigate(`/search?${queryParams}`);
  };

  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 space-y-8">
        <SearchForm />
        <StationLineSearch onSearch={handleStationLineSearch} />
      </div>
      <FeaturedProperties />
      <ServiceFeatures />
      <PopularAreas />
    </div>
  );
};

export default HomePage;