import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import { AppContext } from './AppContext';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || '£';
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchRooms = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/rooms');
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsOwner(data.role === 'hotelOwner');
        setSearchedCities(
          Array.isArray(data.recentSearchedCities)
            ? data.recentSearchedCities
            : []
        );
      } else {
        setSearchedCities([]);
        // Retry Fetching User Details after 5 seconds
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      setSearchedCities([]);
      toast.error(error.message);
    }
  }, [getToken]);

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms,
    toast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
