import React, { useState } from 'react';
import Header from './components/Header';
import WarrantyForm from './components/WarrantyForm';
import ConfirmationScreen from './components/ConfirmationScreen';

interface FormData {
  serialNumber: string;
  customerName: string;
  mobileNumber: string;
  email: string;
  address: string;
  pincode: string;
  productPrice: string;
  invoiceDate: string;
  invoiceFile: File | null;
  productImage: File | null;
}

function App() {
  const [currentStep, setCurrentStep] = useState<'form' | 'confirmation'>('form');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setSubmittedData(data);
    setCurrentStep('confirmation');
  };

  const handleStartOver = () => {
    setCurrentStep('form');
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="py-8">
        {currentStep === 'form' && (
          <WarrantyForm onSubmit={handleFormSubmit} />
        )}
        
        {currentStep === 'confirmation' && submittedData && (
          <ConfirmationScreen
            customerName={submittedData.customerName}
            serialNumber={submittedData.serialNumber}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Beston Electronics</h3>
              <p className="text-gray-400 text-sm">
                Leading manufacturer of premium LED TVs and home entertainment solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">SERVIZ Care</h3>
              <p className="text-gray-400 text-sm">
                Your trusted partner for extended warranty and premium support services.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 text-sm text-gray-400">
            <p>&copy; 2025 Beston Electronics & SERVIZ Care. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;