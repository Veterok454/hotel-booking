import React from 'react';
import Testimonial from '../components/Testimonial';

const About = () => {
  return (
    <div className='animate-fadeIn'>
      <div className='pt-28 md:pt-32 px-6 md:px-16 lg:px-24 xl:px-32 text-gray-700 '>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8'>
          <h1 className='text-4xl md:text-5xl font-playfair'>About Us</h1>
        </div>

        {/* Intro */}
        <p className='text-base md:text-lg leading-7 mb-8'>
          <span className='font-semibold text-2xl'>BestToStay</span> is a modern
          platform designed to connect hotel owners with guests seeking comfort,
          quality, and an enjoyable accommodation experience. We help hotels
          easily present their services and attract new customers, while
          travellers can find the ideal place for a holiday or business trip.
        </p>

        {/* Mission Section */}
        <div className='bg-gray-50 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 mb-10'>
          <h2 className='text-2xl font-playfair mb-3 text-gray-800'>
            Our Mission
          </h2>
          <p className='text-base md:text-lg leading-7'>
            Our mission is to simplify the booking process and create a
            transparent ecosystem where users can find the best deals, explore
            essential details, and hotel owners can manage their properties and
            attract more guests without unnecessary complications.
          </p>
        </div>

        {/* Why BestToStay Section */}
        <div className='mb-10'>
          <h2 className='text-2xl font-playfair mb-4 text-gray-800'>
            Why <span className='font-semibold text-xl'>BestToStay</span>?
          </h2>
          <ul className='grid md:grid-cols-2 gap-4 text-base md:text-lg'>
            <li className='flex items-start gap-3'>
              ✅ <span>Easy and fast booking for travellers</span>
            </li>
            <li className='flex items-start gap-3'>
              ✅ <span>Transparent and user-friendly platform</span>
            </li>
            <li className='flex items-start gap-3'>
              ✅{' '}
              <span>Hotel owners can showcase and manage their listings</span>
            </li>
            <li className='flex items-start gap-3'>
              ✅ <span>Secure and reliable environment for both sides</span>
            </li>
          </ul>
        </div>

        {/* Development Section */}
        <div className='border-l-4 border-primary pl-5 my-8 mb-24'>
          <p className='text-base md:text-lg leading-7 italic'>
            We continuously enhance the platform, introducing new features and
            aiming to make the service as convenient, fast, and reliable as
            possible — ensuring a smooth experience for both travellers and
            hoteliers.
          </p>
        </div>
      </div>
      <Testimonial />
    </div>
  );
};

export default About;
