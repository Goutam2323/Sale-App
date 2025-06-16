import React from 'react';
import { CheckCircle, Download, MessageCircle, Mail, Calendar, Shield } from 'lucide-react';

interface ConfirmationScreenProps {
  customerName: string;
  serialNumber: string;
  onStartOver: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  customerName,
  serialNumber,
  onStartOver,
}) => {
  const warrantyPlan = '1+3'; // Simulated based on serial number
  const startDate = new Date();
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 4);

  const downloadCertificate = () => {
    // Simulate PDF download
    alert('Warranty certificate download will start shortly.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Success Animation */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Warranty Activated Successfully!
          </h2>
          <p className="text-gray-600">
            Thank you, {customerName}! Your Beston LED TV warranty has been activated.
          </p>
        </div>

        {/* Warranty Details Card */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Warranty Information
              </h3>
              <div className="space-y-2">
                <p><span className="font-medium">Serial Number:</span> {serialNumber}</p>
                <p><span className="font-medium">Warranty Plan:</span> {warrantyPlan} Years</p>
                <p><span className="font-medium">Plan Type:</span> 1 Year OEM + 3 Years Extended</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Coverage Period
              </h3>
              <div className="space-y-2">
                <p><span className="font-medium">Coverage Start:</span> {startDate.toLocaleDateString()}</p>
                <p><span className="font-medium">Coverage End:</span> {endDate.toLocaleDateString()}</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">Active</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={downloadCertificate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Certificate
          </button>
          <button
            onClick={() => window.open('mailto:support@servizcare.com', '_blank')}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <Mail className="h-5 w-5 mr-2" />
            Email Support
          </button>
          <button
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp Support
          </button>
        </div>

        {/* Confirmation Messages */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Confirmation Messages Sent</h4>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>✓ Email confirmation sent to your registered email</p>
            <p>✓ SMS confirmation sent to your mobile number</p>
            <p>✓ WhatsApp message with certificate link sent</p>
          </div>
        </div>

        {/* Support Information */}
        <div className="border-t pt-6 text-sm text-gray-600">
          <p className="mb-2">For any queries or support, please contact:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <span>📧 support@servizcare.com</span>
            <span>📞 1800-XXX-XXXX</span>
            <span>🌐 www.servizcare.com</span>
          </div>
        </div>

        {/* Start Over Button */}
        <div className="mt-8">
          <button
            onClick={onStartOver}
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Activate Another Warranty
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;