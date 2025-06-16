import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormData } from '../../app.component';

@Component({
  selector: 'app-warranty-form',
  templateUrl: './warranty-form.component.html',
  styleUrls: ['./warranty-form.component.css']
})
export class WarrantyFormComponent {
  @Output() formSubmit = new EventEmitter<FormData>();

  warrantyForm: FormGroup;
  otpStep: 'enter' | 'verify' | 'verified' = 'enter';
  otp = '';
  isSubmitting = false;
  invoiceFile: File | null = null;
  productImage: File | null = null;

  constructor(private fb: FormBuilder) {
    this.warrantyForm = this.fb.group({
      serialNumber: ['', Validators.required],
      customerName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', Validators.email],
      address: [''],
      pincode: [''],
      productPrice: [''],
      invoiceDate: ['']
    });
  }

  get formControls() {
    return this.warrantyForm.controls;
  }

  sendOtp(): void {
    const mobileControl = this.formControls['mobileNumber'];
    if (mobileControl.invalid) {
      mobileControl.markAsTouched();
      return;
    }
    this.otpStep = 'verify';
    setTimeout(() => {
      alert('OTP sent to your mobile number. Use 123456 for demo.');
    }, 500);
  }

  verifyOtp(): void {
    if (this.otp === '123456') {
      this.otpStep = 'verified';
    } else {
      alert('Invalid OTP. Please try again.');
    }
  }

  onFileUpload(event: Event, type: 'invoice' | 'product'): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    
    if (file && file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return;
    }

    if (type === 'invoice') {
      this.invoiceFile = file;
    } else {
      this.productImage = file;
    }
  }

  onSubmit(): void {
    if (this.warrantyForm.invalid) {
      Object.keys(this.formControls).forEach(key => {
        this.formControls[key].markAsTouched();
      });
      return;
    }

    if (!this.invoiceFile || !this.productImage) {
      alert('Please upload both invoice and product image');
      return;
    }

    if (this.otpStep !== 'verified') {
      alert('Please verify your mobile number');
      return;
    }

    this.isSubmitting = true;
    
    setTimeout(() => {
      const formData: FormData = {
        ...this.warrantyForm.value,
        invoiceFile: this.invoiceFile,
        productImage: this.productImage
      };
      
      this.formSubmit.emit(formData);
      this.isSubmitting = false;
    }, 2000);
  }
}