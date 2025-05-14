import React from 'react';

const NavigationBar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">MyApp</div>
        <ul className="flex space-x-4">
          <li>
            <a href="users" className="text-white hover:text-gray-200">
              Users
            </a>
          </li>
          <li>
            <a href="courses" className="text-white hover:text-gray-200">
              Courses
            </a>
          </li>
          <li>
            <a href="tryout-sections" className="text-white hover:text-gray-200">
              Tryout Sections
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;

