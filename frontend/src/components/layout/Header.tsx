import { Routes, Route, Link } from 'react-router-dom';

import logo from '../../assets/layout/logo-temp.svg';

import Navbar from './Navbar.tsx'

function Header() {
  return (
    <div className="flex flex-row w-full h-20 bg-white items-center justify-between">
      <Link to="/">
        <img 
          src={logo} 
          alt="The Logo of The Colorizer Korea"
          className="h-10 px-7"></img>
      </Link>
      <Navbar />
    </div>
  )
}

export default Header;