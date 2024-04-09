import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import { logout as logoutThunk } from '../features/auth/authThunks.js';

function Header({ className, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const onLogout = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    dispatch(logoutThunk())
      .then(unwrapResult)
      .then(() => navigate('/login'))
      .catch(() => {});
  };

  let linkEls = [];

  if (isLoggedIn && user) {
    linkEls.push(
      // <NavLink key="nav-uzduotys" className="text-sm" to="/dashboard">
      //   Užduotys
      // </NavLink>,
      <Link key="nav-atsijungti" className="text-sm" onClick={onLogout}>
        Atsijungti
      </Link>
    );
  } else {
    linkEls.push(
      <NavLink key="key-prisijungti" className="text-sm" to="/login">
        Prisijungti
      </NavLink>
    );
  }

  return (
    <header
      className={
        'flex flex-row items-center justify-between bg-blue-600 px-10 text-white drop-shadow-md' +
        (className ? ` ${className}` : '')
      }
      {...props}
    >
      <Logo />
      <nav className="flex flex-row gap-4">{linkEls}</nav>
    </header>
  );
}

export default Header;
