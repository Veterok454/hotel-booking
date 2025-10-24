import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets, cities } from '../assets/assets';
import { useClerk, UserButton } from '@clerk/clerk-react';
import { useAppContext } from '../hooks/useAppContext';

const BookIcon = () => (
  <svg
    className='w-4 h-4 text-gray-700'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4'
    />
  </svg>
);
const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'Experience', path: '/experience' },
    { name: 'About', path: '/about' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchDestination, setSearchDestination] = useState('');

  const { openSignIn } = useClerk();
  const location = useLocation();

  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled((prev) => (location.pathname !== '/' ? true : prev));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchDestination.trim()) {
      navigate(`/rooms?destination=${searchDestination}`);
      setShowSearch(false);
      setSearchDestination('');
      scrollTo(0, 0);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? 'bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4'
            : 'py-4 md:py-6'
        }`}
      >
        {/* Logo */}
        <Link
          onClick={() => {
            scrollTo(0, 0);
          }}
          to='/'
        >
          <img
            src={assets.logo}
            alt='logo'
            className={`h-9 ${isScrolled && 'invert opacity-80 '}`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-4 lg:gap-8'>
          {navLinks.map((link, i) => (
            <Link
              onClick={() => {
                scrollTo(0, 0);
              }}
              key={i}
              to={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? 'bg-gray-700' : 'bg-white'
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
          ))}

          {user && (
            <button
              className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
                isScrolled ? 'text-black' : 'text-white'
              } transition-all`}
              onClick={() =>
                isOwner ? navigate('/owner') : setShowHotelReg(true)
              }
            >
              {isOwner ? 'Dashboard' : 'List Your Hotel'}
            </button>
          )}
        </div>

        {/* Desktop Right */}
        <div className='hidden md:flex items-center gap-4'>
          <img
            onClick={() => setShowSearch(true)}
            src={assets.searchIcon}
            alt='searchIcon'
            className={`h-7 ${
              isScrolled && 'invert'
            } transition-all duration-500 cursor-pointer`}
          />

          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label='My Bookings'
                  labelIcon={<BookIcon />}
                  onClick={() => navigate('/my-bookings')}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className='bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer'
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='flex items-center gap-3 md:hidden'>
          <img
            onClick={() => setShowSearch(true)}
            src={assets.searchIcon}
            alt='searchIcon'
            className={`h-6 ${isScrolled && 'invert'} cursor-pointer`}
          />

          {user && (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label='My Bookings'
                  labelIcon={<BookIcon />}
                  onClick={() => navigate('/my-bookings')}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}

          <img
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            src={assets.menuIcon}
            alt='menuIcon'
            className={`h-4 ${isScrolled && 'invert'} cursor-pointer`}
          />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            className='absolute top-4 right-4'
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={assets.closeIcon} alt='CloseIcon' className='h-6.5' />
          </button>

          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => {
                setIsMenuOpen(false);
                scrollTo(0, 0);
              }}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <button
              className='border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all'
              onClick={() => {
                isOwner ? navigate('/owner') : setShowHotelReg(true);
                setIsMenuOpen(false);
              }}
            >
              {isOwner ? 'Dashboard' : 'List Your Hotel'}
            </button>
          )}

          {!user && (
            <button
              onClick={openSignIn}
              className='bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500'
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      {showSearch && (
        <div
          onClick={() => setShowSearch(false)}
          className='fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-fadeIn'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl'
          >
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-semibold text-gray-800'>
                Search Hotels
              </h2>
              <button
                onClick={() => setShowSearch(false)}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <img src={assets.closeIcon} alt='close' className='h-5 w-5' />
              </button>
            </div>

            <form onSubmit={handleSearch} className='space-y-4'>
              <div>
                <label
                  htmlFor='searchDestination'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Destination
                </label>
                <input
                  id='searchDestination'
                  type='text'
                  list='searchCities'
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  placeholder='Where do you want to go?'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                  required
                />
                <datalist id='searchCities'>
                  {cities.map((city, index) => (
                    <option key={index} value={city} />
                  ))}
                </datalist>
              </div>

              <button
                type='submit'
                className='w-full bg-primary hover:bg-primary-dull text-white font-medium py-3 rounded-lg transition-all active:scale-95'
              >
                Search Hotels
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
