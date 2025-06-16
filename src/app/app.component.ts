import { Component } from '@angular/core';

export interface FormData {
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentStep: 'form' | 'confirmation' = 'form';
  submittedData: FormData | null = null;

  onFormSubmit(data: FormData): void {
    this.submittedData = data;
    this.currentStep = 'confirmation';
  }

  onStartOver(): void {
    this.currentStep = 'form';
    this.submittedData = null;
  }
}