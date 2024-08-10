import {useState} from 'react';
import {FiMenu} from 'react-icons/fi'; // Import the menu icon
import Logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const links = [
    {
      title: 'Home',
      link: '/',
    },

    {
      title: 'All Books',
      link: '/all-books',
    },
    {
      title: 'Cart',
      link: '/cart',
    },
    {
      title: 'Profile',
      link: '/profile',
    },
  ];
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='flex flex-wrap bg-zinc-800 text-white px-4 md:px-8 py-2 md:py-4 items-center justify-between'>
      <div className='flex items-center justify-between w-full md:w-auto'>
        <Link
          to={'/'}
          className='pointer'
        >
          <img
            className='h-8 md:h-12 me-2 md:me-4'
            src={Logo}
            alt='Logo'
          />
        </Link>
        <div
          className='md:hidden'
          onClick={toggleMenu}
        >
          <FiMenu className='text-2xl cursor-pointer transition-all duration-300 hover:text-red-800' />
        </div>
      </div>

      <div
        className={`nav-link-litwave flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto ${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex  transition-all duration-300`}
      >
        {links.map((item, i) => (
          <>
            {item.title === 'Profile' ? (
              <Link
                to={item.link}
                key={i}
                className={`px-2 py-2 hover:bg-zinc-500 transition-all duration-300 select-none rounded-lg bg-blue-700  text-center  font-sans font-bold text-white`}
              >
                {item.title}{' '}
              </Link>
            ) : (
              <Link
                to={item.link}
                key={i}
                className='px-2 py-2 hover:bg-green-500 transition-all duration-300 select-none rounded-lg text-center  font-sans font-bold text-white'
              >
                {item.title}{' '}
              </Link>
            )}
          </>
        ))}

        {isLoggedIn === false && (
          <div className='flex flex-col md:flex-row gap-4'>
            <Link to={'/login'}>
              <button
                className='select-none rounded-lg bg-blue-500 px-2 py-1 md:px-2 md:py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                type='button'
              >
                Log In
              </button>
            </Link>

            <Link to={'/signup'}>
              <button
                className='select-none rounded-lg bg-green-500 px-2 py-1 md:px-2 md:py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                type='button'
              >
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
