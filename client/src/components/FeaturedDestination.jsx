import React, { useMemo } from 'react';
import HotelCard from './HotelCard';
import Title from './Title';
import { useAppContext } from '../hooks/useAppContext';

const FeaturedDestination = () => {
  const { rooms } = useAppContext();

  const featuredRooms = useMemo(() => {
    return [...rooms]
      .sort((a, b) => b.pricePerNight - a.pricePerNight)
      .slice(0, 4);
  }, [rooms]);

  return (
    rooms.length > 0 && (
      <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
        <Title
          title='Featured Luxury Hotels'
          subTitle='Experience the finest accommodations with premium amenities, exceptional service, and breathtaking locations'
        />

        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
          {featuredRooms.map((room, index) => (
            <HotelCard room={room} index={index} key={room._id} />
          ))}
        </div>
      </div>
    )
  );
};

export default FeaturedDestination;
