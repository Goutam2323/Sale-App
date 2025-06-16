import React, { useState } from 'react';
import { Upload, Phone, Mail, MapPin, Calendar, FileText, Camera, CheckCircle, AlertCircle, Shield, User } from 'lucide-react';

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

interface WarrantyFormProps {
  onSubmit: (data: FormData) => void;
}

const WarrantyForm: React.FC<WarrantyFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    serialNumber: '',
    customerName: '',
    mobileNumber: '',
    email: '',
    address: '',
    pincode: '',
    productPrice: '',
    invoiceDate: '',
    invoiceFile: null,
    productImage: null,
  });

  const [otpStep, setOtpStep] = useState<'enter' | 'verify' | 'verified'>('enter');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Mandatory field validations
    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = 'Serial number is required';
    }
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.invoiceFile) {
      newErrors.invoiceFile = 'Invoice upload is required';
    }
    if (!formData.productImage) {
      newErrors.productImage = 'Product picture with serial number is required';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (otpStep !== 'verified') {
      newErrors.otp = 'Please verify your mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field: 'invoiceFile' | 'productImage', file: File | null) => {
    if (file && file.size > 50 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [field]: 'File size must be less than 50MB' }));
      return;
    }
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const sendOtp = () => {
    if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber)) {
      setErrors(prev => ({ ...prev, mobileNumber: 'Please enter a valid 10-digit mobile number' }));
      return;
    }
    setOtpStep('verify');
    // Simulate OTP sending
    setTimeout(() => {
      alert('OTP sent to your mobile number. Use 123456 for demo.');
    }, 500);
  };

  const verifyOtp = () => {
    if (otp === '123456') {
      setOtpStep('verified');
      setErrors(prev => ({ ...prev, otp: '' }));
    } else {
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Mandatory Fields Section */}
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-red-500">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mandatory Information</h2>
                <p className="text-sm text-gray-600">Required fields to activate your warranty</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Serial Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Serial Number *
              </label>
              <input
                type="text"
                value={formData.serialNumber}
                onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Enter your TV's serial number"
              />
              {errors.serialNumber && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.serialNumber}
                </p>
              )}
            </div>

            {/* Customer Name and Mobile Number */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.customerName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter 10-digit mobile number"
                    disabled={otpStep === 'verified'}
                  />
                  {otpStep === 'enter' && (
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center whitespace-nowrap"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Send OTP
                    </button>
                  )}
                  {otpStep === 'verified' && (
                    <div className="px-4 py-3 bg-green-100 text-green-700 rounded-lg flex items-center whitespace-nowrap">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.mobileNumber}
                  </p>
                )}
              </div>
            </div>

            {/* OTP Verification */}
            {otpStep === 'verify' && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP *
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter 6-digit OTP"
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Verify
                  </button>
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.otp}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-2">
                  For demo purposes, use OTP: <span className="font-mono font-semibold">123456</span>
                </p>
              </div>
            )}

            {/* Mandatory File Uploads */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Upload Invoice *
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  errors.invoiceFile ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-red-400'
                }`}>
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileUpload('invoiceFile', e.target.files?.[0] || null)}
                    className="hidden"
                    id="invoice-upload"
                  />
                  <label htmlFor="invoice-upload" className="cursor-pointer">
                    <span className="text-red-600 font-medium">Click to upload</span>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG, PDF (max 50MB)</p>
                  </label>
                  {formData.invoiceFile && (
                    <p className="text-green-600 text-sm mt-2 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {formData.invoiceFile.name}
                    </p>
                  )}
                </div>
                {errors.invoiceFile && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.invoiceFile}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Camera className="h-4 w-4 inline mr-1" />
                  Product Picture with Serial Number *
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  errors.productImage ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-red-400'
                }`}>
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('productImage', e.target.files?.[0] || null)}
                    className="hidden"
                    id="product-upload"
                  />
                  <label htmlFor="product-upload" className="cursor-pointer">
                    <span className="text-red-600 font-medium">Click to upload</span>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG (max 50MB)</p>
                  </label>
                  {formData.productImage && (
                    <p className="text-green-600 text-sm mt-2 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {formData.productImage.name}
                    </p>
                  )}
                </div>
                {errors.productImage && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.productImage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="px-4 text-sm text-gray-500 font-medium">Optional Information</div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Non-Mandatory Fields Section */}
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Additional Information</h2>
                <p className="text-sm text-gray-600">Optional fields for better service and support</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Email and Product Price */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email ID
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Price
                </label>
                <input
                  type="text"
                  value={formData.productPrice}
                  onChange={(e) => handleInputChange('productPrice', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter product price (without discount)"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Full Address
              </label>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Pincode"
                  />
                </div>
              </div>
            </div>

            {/* Invoice Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Invoice Date
              </label>
              <input
                type="date"
                value={formData.invoiceDate}
                onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Activating Warranty...
              </div>
            ) : (
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Activate Warranty
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WarrantyForm;