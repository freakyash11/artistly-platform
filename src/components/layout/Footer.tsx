import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 rounded-lg shadow-sm m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
         All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 sm:mt-0 text-sm font-medium text-gray-500 dark:text-gray-400">
          <li className="mr-4 md:mr-6">
            <Link href="/onboard" className="hover:underline">
              Artist Onboarding
            </Link>
          </li>
          <li className="mr-4 md:mr-6">
            <Link href="/dashboard" className="hover:underline">
              Manager Dashboard
            </Link>
          </li>
          <li className="mr-4 md:mr-6">
            <Link href="/artists" className="hover:underline">
              Artist Listing
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
