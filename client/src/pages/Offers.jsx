import React, { useState } from 'react';
import { assets, exclusiveOffers } from '../assets/assets';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Offers = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookNow = (offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error('Please enter your email');
    }

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/offers/request`,
        {
          email,
          offerTitle: selectedOffer.title,
          offerDiscount: selectedOffer.priceOff,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setEmail('');
        setShowModal(false);
        setSelectedOffer(null);
      } else {
        toast.error(data.message || 'Failed to send request');
      }
    } catch {
      toast.error('Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOffer(null);
    setEmail('');
  };

  return (
    <>
      <div className='pt-28 md:pt-32 px-6 md:px-16 lg:px-24 xl:px-32 pb-20'>
        <Title
          title='Exclusive Offers'
          subTitle='Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.'
        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
          {exclusiveOffers.map((item) => (
            <div
              key={item._id}
              className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center min-h-[300px]'
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'>
                {item.priceOff}% OFF
              </p>
              <div>
                <p className='text-2xl font-medium font-playfair'>
                  {item.title}
                </p>
                <p className='mt-2'>{item.description}</p>
                <p className='text-xs text-white/70 mt-3'>
                  Expires {item.expiryDate}
                </p>
              </div>
              <button
                onClick={() => handleBookNow(item)}
                className='flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5 hover:underline'
              >
                Book Now
                <img
                  src={assets.arrowIcon}
                  alt='arrowIcon'
                  className='invert group-hover:translate-x-1 transition-all'
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          onClick={closeModal}
          className='fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl'
          >
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-semibold text-gray-800'>
                Request Offer
              </h2>
              <button
                onClick={closeModal}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <img src={assets.closeIcon} alt='close' className='h-5 w-5' />
              </button>
            </div>

            {selectedOffer && (
              <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
                <h3 className='font-semibold text-gray-800'>
                  {selectedOffer.title}
                </h3>
                <p className='text-sm text-gray-600 mt-1'>
                  {selectedOffer.description}
                </p>
                <p className='text-sm font-medium text-primary mt-2'>
                  {selectedOffer.priceOff}% OFF
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='offerEmail'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Your Email
                </label>
                <input
                  id='offerEmail'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                  disabled={isSubmitting}
                  required
                />
              </div>

              <p className='text-xs text-gray-500'>
                We'll contact you shortly with more details about this exclusive
                offer.
              </p>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-primary hover:bg-primary-dull text-white font-medium py-3 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Offers;
