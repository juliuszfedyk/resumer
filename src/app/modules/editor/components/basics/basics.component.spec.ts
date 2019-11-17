import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicsComponent } from './basics.component';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Component, forwardRef } from '@angular/core';
import { ResumeService } from '@app/shared/services/resume.service';
import { of } from 'rxjs';
import { emptyResume } from '@app/shared/defaults/empty-resume';
import { Basics } from '@models/basics.model';

// MockProfiles
@Component({
  selector: 'app-profiles',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockProfilesComponent),
    multi: true
  }]
})
class MockProfilesComponent implements ControlValueAccessor {
  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'app-country-input',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockCountryInputComponent),
    multi: true
  }]
})
class MockCountryInputComponent implements ControlValueAccessor {
  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}

class MockResumeService {
  getBasics$() {
    return of(emptyResume.basics);
  }
  setBasics(valueChanges: Basics) {}
}

describe('BasicsComponent', () => {
  let component: BasicsComponent;
  let fixture: ComponentFixture<BasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicsComponent, MockProfilesComponent, MockCountryInputComponent],
      providers: [{ provide: ResumeService, useClass: MockResumeService}],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should call the ResumeService getBasics()', async(() => {
      const resumeService = fixture.debugElement.injector.get(ResumeService);
      const spy = spyOn(resumeService, 'getBasics$').and.callThrough();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
      });
      fixture.detectChanges();
    }));
    it('should create a proper FormGroup', async(() => {
      fixture.whenStable().then(() => {
        expect(component.basicsFormGroup).toBeTruthy();
        expect(component.basicsFormGroup instanceof FormGroup).toBeTruthy();
        expect(component.basicsFormGroup.get('name')).toBeTruthy();
        expect(component.basicsFormGroup.get('label')).toBeTruthy();
        expect(component.basicsFormGroup.get('summary')).toBeTruthy();
      });
      fixture.detectChanges();
    }));
  });
  describe('value changes', () => {
    beforeEach( () => {
      fixture.detectChanges();
    });
    it('should call the ResumeService setBasics with the changed value', async(() => {
      const resumeService = fixture.debugElement.injector.get(ResumeService);
      const spy = spyOn(resumeService, 'setBasics');
      const summaryControl = component.basicsFormGroup.get('summary');
      summaryControl.setValue('new summary');
      fixture.whenStable().then( () => {
        expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({summary: 'new summary'}));
      });
    }));
  });

  describe('OnDestroy', () => {
    it('should unsubscribe subscriptions', () => {
      const spy = spyOn(component.subscriptions, 'unsubscribe');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });
  });
});
