import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error('Please enter your email');
    }

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/newsletter/subscribe`,
        { email }
      );

      if (data.success) {
        toast.success('Subscribed successfully!');
        setEmail('');
      } else {
        toast.error(data.message || 'Subscription failed');
      }
    } catch (err) {
      // handle specific server responses (409 duplicate)
      if (err.response && err.response.status === 409) {
        toast('You are already subscribed.');
      } else {
        toast.error('Server error. Try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
        <div className='max-w-80'>
          <img
            src={assets.logo}
            alt='logo'
            className='mb-4 h-8 md:h-9 invert opacity-80'
          />
          <p className='text-sm'>
            Discover the world's most extraordinary places to stay, from
            boutique hotels to luxury villas and private islands.
          </p>
          <div className='flex items-center gap-3 mt-4'>
            <Link
              to='https://www.instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={assets.instagramIcon}
                alt='instagramIcon'
                className='w-6 cursor-pointer hover:opacity-80 transition-opacity'
              />
            </Link>
            <Link
              to='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={assets.facebookIcon}
                alt='facebookIcon'
                className='w-6 cursor-pointer hover:opacity-80 transition-opacity'
              />
            </Link>
            <Link
              to='https://www.twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={assets.twitterIcon}
                alt='twitterIcon'
                className='w-6 cursor-pointer hover:opacity-80 transition-opacity'
              />
            </Link>
            <Link
              to='https://www.linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={assets.linkendinIcon}
                alt='linkendinIcon'
                className='w-6 cursor-pointer hover:opacity-80 transition-opacity'
              />
            </Link>
          </div>
        </div>

        <div>
          <p className='font-playfair text-lg text-gray-800'>COMPANY</p>
          <ul className='mt-3 flex flex-col gap-2 text-sm'>
            <li>
              <a href='#' className='hover:text-gray-800 transition-colors'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-800 transition-colors'>
                Careers
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-800 transition-colors'>
                Press
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-800 transition-colors'>
                Blog
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-800 transition-colors'>
                Partners
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className='font-playfair text-lg text-gray-800'>SUPPORT</p>
          <ul className='mt-3 flex flex-col gap-2 text-sm'>
            <li>
              <a href='#' className='hover:text-gray-800 transition-colors'>
                Help Center
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-800 transition-colors'>
                Safety Information
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-800 transition-colors'>
                Cancellation Options
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-800 transition-colors'>
                Contact Us
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-800 transition-colors'>
                Accessibility
              </a>
            </li>
          </ul>
        </div>

        <div className='max-w-80'>
          <p className='font-playfair text-lg text-gray-800'>STAY UPDATED</p>
          <p className='mt-3 text-sm'>
            Subscribe to our newsletter for travel inspiration and special
            offers.
          </p>
          <form onSubmit={handleSubscribe} className='flex items-center mt-4'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none'
              placeholder='Your email'
              disabled={isSubmitting}
              required
            />
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex items-center justify-center bg-black hover:bg-gray-800 h-9 w-9 aspect-square rounded-r transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {' '}
              {isSubmitting ? (
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              ) : (
                <img
                  src={assets.arrowIcon}
                  alt='arrowIcon'
                  className='w-3.5 invert'
                />
              )}
            </button>
          </form>
        </div>
      </div>
      <hr className='border-gray-300 mt-8' />
      <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
        <p className='text-sm'>
          © {new Date().getFullYear()} BestToStay. All rights reserved.
        </p>
        <ul className='flex items-center gap-4 text-sm'>
          <li>
            <a href='#' className='hover:text-gray-800 transition-colors'>
              Privacy
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-800 transition-colors'>
              Terms
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-800 transition-colors'>
              Sitemap
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
