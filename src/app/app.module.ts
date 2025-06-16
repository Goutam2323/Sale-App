import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Shield, Tv, CheckCircle, Download, MessageCircle, Mail, Calendar, Upload, Phone, MapPin, FileText, Camera, AlertCircle, User } from 'lucide-angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { WarrantyFormComponent } from './components/warranty-form/warranty-form.component';
import { ConfirmationScreenComponent } from './components/confirmation-screen/confirmation-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WarrantyFormComponent,
    ConfirmationScreenComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    LucideAngularModule.pick({
      Shield,
      Tv,
      CheckCircle,
      Download,
      MessageCircle,
      Mail,
      Calendar,
      Upload,
      Phone,
      MapPin,
      FileText,
      Camera,
      AlertCircle,
      User
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }