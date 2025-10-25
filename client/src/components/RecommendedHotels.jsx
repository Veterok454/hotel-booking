import React, { useEffect, useState, useCallback } from 'react';
import HotelCard from './HotelCard';
import Title from './Title';
import { useAppContext } from '../hooks/useAppContext';

const RecommendedHotels = () => {
  const { rooms, searchedCities, navigate } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const getRandomRooms = useCallback((roomsList, count = 4) => {
    const shuffled = [...roomsList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, []);

  const filterHotels = useCallback(() => {
    if (searchedCities.length > 0) {
      const filteredHotels = rooms.filter((room) =>
        searchedCities.includes(room.hotel?.city)
      );
      setRecommended(getRandomRooms(filteredHotels, 4));
    } else {
      setRecommended(getRandomRooms(rooms, 4));
    }
  }, [rooms, searchedCities, getRandomRooms]);

  useEffect(() => {
    filterHotels();
  }, [filterHotels]);

  if (rooms.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20 pb-6'>
      <Title
        title={
          searchedCities.length > 0
            ? 'Recommended Hotels'
            : 'Find an amazing hotel that suits you'
        }
        subTitle='Explore handpicked destinations tailored just for you, featuring world-class amenities and unforgettable experiences'
      />

      <div className='flex flex-wrap items-center justify-centerv gap-6 mt-20'>
        {recommended.map((room, index) => (
          <HotelCard room={room} index={index} key={room._id} />
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/rooms');
          scrollTo(0, 0);
        }}
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-100 transition-all cursor-pointer'
      >
        View All Hotels
      </button>
    </div>
  );
};

export default RecommendedHotels;
