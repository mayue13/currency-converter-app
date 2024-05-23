import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
})
export class CurrenciesComponent {
  @Input() selectCurrency: any;
  @Input() currency: any;

  public selectCurrencyFunc(currency: any) {
    console.log(currency);
    this.selectCurrency(currency);
  }
}
