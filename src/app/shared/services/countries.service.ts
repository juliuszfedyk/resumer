import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '@models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  static url = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code';

  constructor(private httpClient: HttpClient) {}
  getCountries$(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(CountriesService.url);
  }
}
