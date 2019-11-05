import { Component, forwardRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CountriesService } from '@app/shared/services/countries.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '@models/country.model';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CountryInputComponent),
    multi: true
  }]
})
export class CountryInputComponent implements ControlValueAccessor, OnDestroy {
  searching = false;
  searchFailed = false;
  onChange: (value: string) => any;
  onTouched: (value: string) => any;
  private countries: Country[];
  private countriesSubscription: Subscription;

  constructor(private countriesService: CountriesService) {
  }

  // tslint:disable-next-line:variable-name
  private _countryName: string;

  get countryName(): string {
    return this._countryName;
  }

  set countryName(countryName: string) {
    this._countryName = countryName;
    if (countryName) {
      const countryCode = this.countries.find((country: Country) => country.name = countryName).alpha2Code;
      if (countryCode) {
        this.onChange(countryCode);
      } else {
        this._countryName = null;
      }
    }
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        return term.length < 2 ? [] : this.countries
          .filter((country: Country) => country.name.toLowerCase().includes(term.toLowerCase()))
          .map((country: Country) => country.name)
          .slice(0, 10);
      }));
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(countryCode: string): void {
    if (this.countries && countryCode) {
      this.countryName = this.countries.find((country: Country) => country.alpha2Code = countryCode).name;
    } else if (!this.countriesSubscription) {
      this.countriesSubscription = this.countriesService.getCountries$()
        .subscribe(
          (countries: Country[]) => {
            this.countries = countries;
            if (countryCode) {
              this.countryName = this.countries.find((country: Country) => country.alpha2Code = countryCode).name;
            }
          }
        );
    }
  }

  ngOnDestroy(): void {
    if (this.countriesSubscription) {
      this.countriesSubscription.unsubscribe();
    }
  }

}
