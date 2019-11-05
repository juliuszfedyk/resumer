import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryInputComponent } from './country-input.component';
import { Directive, Input } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { CountriesService } from '@app/shared/services/countries.service';
import { FormsModule } from '@angular/forms';

const mockCountries = [
  { name: 'Poland', alpha2Code: 'PL' },
  { name: 'Germany', alpha2Code: 'DE' },
  { name: 'Finland', alpha2Code: 'FI' }
];

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngbTypeahead]',
})
class MockTypeaheadDirective {
  @Input() ngbTypeahead: any;
  @Input() editable: boolean;
}

class MockCountriesService {
  getCountries$ = () => of(mockCountries);
}

describe('CountryInputComponent', () => {
  let component: CountryInputComponent;
  let fixture: ComponentFixture<CountryInputComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountryInputComponent, MockTypeaheadDirective],
      imports: [FormsModule],
      providers: [{ provide: CountriesService, useClass: MockCountriesService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryInputComponent);
    component = fixture.componentInstance;
    component.onChange = (value: string) => {
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('writeValue', () => {
    describe('IF countries ARE set', () => {
      it('should set the countryName if the countries are defined and countryCode is provided'
        + 'and NOT call the CountriesService', () => {
        const countriesService = fixture.debugElement.injector.get(CountriesService);
        const spy = spyOn(countriesService, 'getCountries$');
        component.onChange = (value: string) => {
        };
        component['countries'] = mockCountries; // tslint:disable-line
        component.writeValue('PL');
        expect(spy).not.toHaveBeenCalled();
        expect(component.countryName).toBe('Poland');
      });
    });
    describe('IF countries ARE NOT set', () => {
      it('should call the countriesService if there is no pending subscription', () => {
        const countriesService = fixture.debugElement.injector.get(CountriesService);
        const spy = spyOn(countriesService, 'getCountries$').and.callThrough();

        component['countries'] = undefined; // tslint:disable-line
        component.writeValue('PL');
        expect(spy).toHaveBeenCalled();
      });
      it('should NOT call the countriesService if there is a pending subscription', () => {
        const countriesService = fixture.debugElement.injector.get(CountriesService);
        const spy = spyOn(countriesService, 'getCountries$').and.callThrough();

        component['countries'] = undefined; // tslint:disable-line
        component['countriesSubscription'] = new Subscription(); // tslint:disable-line
        component.writeValue('PL');
        expect(spy).not.toHaveBeenCalled();
      });
      it('should set the countryName once the countries are resolved', async(() => {
        component['countries'] = undefined; // tslint:disable-line
        component.writeValue('PL');
        fixture.whenStable().then(() => {
          expect(component.countryName).toBe('Poland');
        });
        fixture.detectChanges();
      }));
    });
  });
  describe('search', () => {
    beforeEach(() => {
      component['countries'] = mockCountries; // tslint:disable-line
    });
    it('return properly filtered array of country names', (done) => {
      component.search(of('land')).subscribe((result: string[]) => {
        expect(result.length).toBe(2);
        expect(result.find(country => country === 'Poland')).toBeTruthy();
        done();
      });
    });
    it('should return empty array if search term is shorter than 2 characters', (done) => {
      component.search(of('p')).subscribe((result: string[]) => {
        expect(result.length).toBe(0);
        done();
      });
    });
  });
});
