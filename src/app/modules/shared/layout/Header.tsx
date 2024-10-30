'use client' //next config

import React from 'react';

import Link from 'next/link';


const Header = () => {

  const logout = () => {
    console.log('hola')
  }
  return (
    <>
      <div className="relative flex items-center justify-between p-4 bg-blue-700">
        <Link href="/" className="text-xl font-bold text-blue-950">
          Finder
        </Link>

        <div className="flex items-center justify-end w-1/2 gap-4 text-lg font-medium text-white-500">
          <button onClick={logout} className="px-3 py-2 transition-all border border-white rounded-lg hover:bg-blue-200 hover:text-blue-700 hover:border-none">
            Cerrar sesion
          </button>
        </div>
      </div>

    </>
  );
};

export default Header;