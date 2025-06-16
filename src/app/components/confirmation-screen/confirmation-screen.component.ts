import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-screen',
  templateUrl: './confirmation-screen.component.html',
  styleUrls: ['./confirmation-screen.component.css']
})
export class ConfirmationScreenComponent {
  @Input() customerName!: string;
  @Input() serialNumber!: string;
  @Output() startOver = new EventEmitter<void>();

  warrantyPlan = '1+3';
  startDate = new Date();
  endDate = new Date();

  constructor() {
    this.endDate.setFullYear(this.endDate.getFullYear() + 4);
  }

  downloadCertificate(): void {
    alert('Warranty certificate download will start shortly.');
  }

  openEmailSupport(): void {
    window.open('mailto:support@servizcare.com', '_blank');
  }

  openWhatsAppSupport(): void {
    window.open('https://wa.me/1234567890', '_blank');
  }

  onStartOver(): void {
    this.startOver.emit();
  }
}