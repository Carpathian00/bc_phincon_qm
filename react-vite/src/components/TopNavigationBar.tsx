import React from 'react';

function TopNavigationBar() {
  return (
    <nav className="bg-gray-800 p-2 flex justify-between items-center">
      <div className="text-white text-xl font-bold">
        MyWebsite
      </div>
      <div className="flex items-center space-x-4">
        <a href="#home" className="text-white hover:underline px-3 py-2 rounded-md">Home</a>
        <a href="#about" className="text-white hover:underline px-3 py-2 rounded-md">About</a>
        <a href="#contact" className="text-white hover:underline px-3 py-2 rounded-md">Contact</a>
      </div>
      <div className="text-white">
        {`Welcome, Adrian!`}
      </div>
    </nav>
  );
}

export default TopNavigationBar;

