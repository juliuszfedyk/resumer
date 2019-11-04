import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { CountriesService } from './countries.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Country } from '@models/country.model';

describe('CountriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService]
    });
  });

  it('should be created', () => {
    const service: CountriesService = TestBed.get(CountriesService);
    expect(service).toBeTruthy();
  });

  describe('getCountries', () => {
    it('should call correct endpoint and return unchanged data', fakeAsync(inject([HttpTestingController, CountriesService], (
      httpMock: HttpTestingController, countriesService: CountriesService
    ) => {
      const countries = [{name: 'Poland', alpha2code: 'pl'}];
      const url = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code';
      let response: Country[] = [];
      countriesService.getCountries$().subscribe((countriesResponse: Country[]) => {
        response = countriesResponse;
      });
      const httpMockRequest = httpMock.expectOne(url);
      httpMockRequest.flush(countries);
      tick();
      expect(response[0].name).toBe('Poland');
      expect(httpMockRequest.request.method).toEqual('GET');
      httpMock.verify();
    })));
  });
});
