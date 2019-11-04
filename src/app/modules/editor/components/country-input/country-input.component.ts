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
  countries: Country[];
  onChange: (value: string) => {};
  onTouched: (value: string) => {};
  private countriesSubscription: Subscription;

  constructor(private countriesService: CountriesService) {
  }

  private _country: Country;

  get country(): Country {
    return this._country;
  }

  set country(country: Country) {
    if (country) {
      this._country = country;
      this.onChange(country.alpha2Code);
    }
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        return term.length < 2 ? [] : this.countries
          .map((country: Country) => country.name)
          .filter((countryName: string) => countryName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
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
      this.country = this.countries.find((country: Country) => country.alpha2Code = countryCode);
    } else if (!this.countriesSubscription) {
      this.countriesSubscription = this.countriesService.getCountries$()
        .subscribe(
          (countries: Country[]) => {
            this.countries = countries;
            this.country = this.countries.find((country: Country) => country.alpha2Code = countryCode);
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
