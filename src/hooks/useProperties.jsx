import { useState, useEffect } from 'react';
import { propertiesDB } from '../lib/database';

// Custom hook for fetching properties
export const useProperties = (filters = {}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = Object.keys(filters).length > 0 
          ? await propertiesDB.search(filters) 
          : await propertiesDB.getAll();
        
        setProperties(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [JSON.stringify(filters)]);

  const refetch = () => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = Object.keys(filters).length > 0 
          ? await propertiesDB.search(filters) 
          : await propertiesDB.getAll();
        
        setProperties(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  };

  return { properties, loading, error, refetch };
};

// Custom hook for fetching a single property
export const useProperty = (propertyId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await propertiesDB.getById(propertyId);
        setProperty(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  return { property, loading, error };
};

// Custom hook for featured properties
export const useFeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await propertiesDB.getFeatured();
        setProperties(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching featured properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return { properties, loading, error };
};