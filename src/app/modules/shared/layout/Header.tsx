'use client' //next config

import React from 'react';

import Link from 'next/link';
import Button from '../buttons/Button';
import { LogOut } from 'lucide-react';


const Header = () => {

  const logout = () => {
    console.log('hola')
  }
  return (
    <>
      <div className="relative flex items-center justify-between p-4 mb-3 border-b shadow-md ">
        <Link href="/" className="text-xl text-orange-400 uppercase">
          Finder
        </Link>

        <div className="flex items-center justify-end w-1/2 gap-4 text-lg font-medium text-white-500">
          <Button
            color='secondary'
            onClick={logout}
            size="normal"
            variant="outlined"
            icon={<LogOut size={20} />}
          >
            Cerrar sesion
          </Button>
        </div>
      </div>

    </>
  );
};

export default Header;