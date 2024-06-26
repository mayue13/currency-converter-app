import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyDashboardComponent } from './components/currency-dashboard/currency-dashboard.component';
import { CurrenciesComponent } from './components/currency-selector/currencies/currencies.component';
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyDashboardComponent,
    CurrencySelectorComponent,
    CurrenciesComponent,
    SocialMediaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
