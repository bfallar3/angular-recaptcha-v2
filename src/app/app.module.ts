import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
