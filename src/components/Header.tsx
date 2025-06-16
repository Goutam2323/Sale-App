import React from 'react';
import { Shield, Tv } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Tv className="h-8 w-8" />
            <span className="text-xl font-bold">VW by Beston</span>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8" />
            <span className="text-xl font-bold">SERVIZ Care</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Activate Your Beston LED Warranty
          </h1>
          <p className="text-blue-100 text-lg">Powered by SERVIZ Care</p>
          <p className="text-blue-200 mt-2 max-w-2xl mx-auto">
            Activate your free extended warranty by entering your product and purchase details below. 
            This process takes less than 2 minutes to complete.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;