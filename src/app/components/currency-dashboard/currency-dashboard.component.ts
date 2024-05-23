import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { COMMON } from '../../constants/common';
import { Currency } from '../../models/currency';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-dashboard',
  templateUrl: './currency-dashboard.component.html',
  styleUrl: './currency-dashboard.component.scss',
})
export class CurrencyDashboardComponent implements OnInit, AfterViewInit {
  title = 'currency-exchange';
  public isDataAvailable = false;
  public failedToLoad = false;
  private _from: any;
  private to: any;
  public amount_value: any;
  @ViewChild('from') fromCmp: any;
  @ViewChild('to') toCmp: any;
  @ViewChild('amount_input', { static: false }) amount_input: any;
  @ViewChild('submitBtn', { static: false }) submitBtn: any;
  @ViewChild('formExchange', { static: false }) formExchange: any;

  public resultFrom: any;
  public resultTo: any;
  public resultInfo: any;
  public isResult = false;
  public lastUpdate: string = COMMON.EMPTY_STRING;
  get from_symbol() {
    return this._from.symbol;
  }

  constructor(
    private modalService: NgbModal,
    public service: CurrencyService
  ) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }
  public selectFrom = (currency: Currency): void => {
    this._from = currency;
    if (this.isResult) this.exchange();
  };

  public selectTo = (currency: Currency): void => {
    this.to = currency;
    if (this.isResult) this.exchange();
  };

  changeAmountValue() {
    this.amount_value = (Math.round(this.amount_value * 100) / 100).toFixed(2);
    localStorage.setItem('amount', this.amount_value);
    if (this.isResult) this.exchange();
  }

  public switchCurrencies() {
    let temp: Currency = this._from;
    this.fromCmp.selectCurrency(this.to);
    this.toCmp.selectCurrency(temp);
    if (this.isResult) this.exchange();
  }

  public exchange() {
    let rateBase = this.to.rate / this._from.rate;
    let result = this.amount_value * rateBase;
    this.resultFrom =
      this.amount_value +
      ' ' +
      (this._from.full_name ? this._from.full_name : this._from.name) +
      ' =';
    this.resultTo =
      result.toFixed(5) +
      ' ' +
      (this.to.full_name ? this.to.full_name : this.to.name);
    this.resultInfo =
      (1).toFixed(2) +
      ' ' +
      this._from.name +
      ' = ' +
      rateBase.toFixed(6) +
      ' ' +
      this.to.name +
      '\n ' +
      (1).toFixed(2) +
      ' ' +
      this.to.name +
      ' = ' +
      (1 / rateBase).toFixed(6) +
      ' ' +
      this._from.name;
  }

  onSubmit(): void {
    this.exchange();
    this.isResult = true;
    var date = new Date(this.service.getLastUpdate());
    this.lastUpdate = date.toLocaleString() + ' UTC';
  }

  ngOnInit(): void {
    this.service.getCurrenciesPromise().then(
      (data) => {
        this._from = data[0];
        this.to = data[1];
        this.isDataAvailable = true;
      },
      () => {
        this.failedToLoad = true;
      }
    );

    let localAmount = localStorage.getItem('amount');
    this.amount_value = localAmount ? localAmount : (1).toFixed(2);
  }

  windowResize(): void {
    this.submitBtn.nativeElement.style.width =
      this.formExchange.nativeElement.style.width;
  }

  ngAfterViewInit(): void {}
}
