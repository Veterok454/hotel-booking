import React from 'react';
import Testimonial from '../components/Testimonial';
import NewsLetter from '../components/NewsLetter';

const Experience = () => {
  return (
    <div className='animate-fadeIn'>
      <div className='pt-28 md:pt-32 px-6 md:px-16 lg:px-24 xl:px-32 text-gray-700'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8'>
          <h1 className='text-4xl md:text-5xl font-playfair'>Our Experience</h1>
        </div>

        {/* Intro */}
        <p className='text-base md:text-lg leading-7 mb-8'>
          <span className='font-semibold text-2xl'>BestToStay</span> was built
          based on an in-depth understanding of the needs of both travellers and
          hotel owners. Our experience shows that transparency, seamless
          booking, and ease of use are key factors that shape a positive user
          experience.
        </p>

        <p className='text-base md:text-lg leading-7 mb-8'>
          We aim for every guest to find the most suitable accommodation
          effortlessly, and for hotel owners to have a simple yet effective tool
          to manage and promote their services. With a well-thought-out
          interface and modern design, BestToStay provides an intuitive,
          enjoyable, and efficient user experience.
        </p>

        <p className='text-base md:text-lg leading-7 mb-8'>
          We welcome feedback and continuously enhance the platform by adding
          new capabilities, ensuring that searching, choosing, and booking
          accommodation remains as seamless and comfortable as possible for all
          users.
        </p>
      </div>
      <Testimonial />
      <NewsLetter />
    </div>
  );
};

export default Experience;
