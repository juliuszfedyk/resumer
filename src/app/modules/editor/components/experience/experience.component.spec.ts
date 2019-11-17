import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';
import { ReactiveFormsModule } from '@angular/forms';
import { mockWorkList } from '@app/shared/services/resume.service.mock';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { Experience } from '@models/experience.model';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let nativeElement: HTMLElement;
  let mockExperience: Experience;
  let mockChange: SimpleChange;
  let mockChanges: SimpleChanges;
  let workProps: string[];

  beforeEach(() => {
    workProps = [
      'company',
      'position',
      'startDate',
      'endDate',
      'summary',
      'url',
      'highlights',
    ];
    mockExperience = { ...mockWorkList[0] };
    mockChange = new SimpleChange(null, mockExperience, true);
    mockChanges = { experience: mockChange };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    component.experience = mockExperience;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('get highlights', () => {
    it('should return the highlights FormArray', () => {
      component.ngOnChanges(mockChanges);
      fixture.detectChanges();
      expect(component.highlightsFormArray.at).toBeTruthy();
    });
  });

  describe('ngOnChanges', () => {
    describe('if the change is the first change', () => {
      it('should set a proper formGroup', () => {
        expect(component.experienceFormGroup).toBeFalsy();
        component.ngOnChanges(mockChanges);
        expect(component.experienceFormGroup).toBeTruthy();
        workProps.forEach(propName => {
          expect(component.experienceFormGroup.get(propName).value).toEqual(
            mockExperience[propName]
          );
        });
      });
    });
    describe('if the change is not the first change', () => {
      beforeEach(() => {
        component.ngOnChanges(mockChanges);
      });
      it('should not re-create the form, but should update the form', () => {
        const mockSubsequentExperience = { ...mockWorkList[1] };
        const mockSubsequentChanges = {
          experience: new SimpleChange(
            mockExperience,
            mockSubsequentExperience,
            false
          ),
        };
        const initialFormInstance = component.experienceFormGroup;
        component.ngOnChanges(mockSubsequentChanges);
        workProps.forEach(propName => {
          if (propName === 'highlights') {
            expect(component.highlightsFormArray.at(0).value).toBe(
              mockSubsequentExperience.highlights[0]
            );
          } else {
            expect(component.experienceFormGroup.get(propName).value).toEqual(
              mockSubsequentExperience[propName]
            );
          }
        });
        expect(component.experienceFormGroup).toBe(initialFormInstance);
      });
    });
  });
  describe('getHighlightControl', () => {
    it('should return a highlight', () => {
      component.ngOnChanges(mockChanges);
      const highlight = component.getHighlightControl(0);
      expect(highlight.value).toBe('saved a building once');
    });
  });

  describe('template related', () => {
    beforeEach(async(() => {
      component.ngOnChanges(mockChanges);
      fixture.detectChanges();
    }));

    describe('add highlight button click', () => {
      it('should add a new highlight', async(() => {
        const initialLength: number = nativeElement.querySelectorAll(
          '.highlight'
        ).length;
        const button: HTMLButtonElement = nativeElement.querySelector(
          '#add-highlight-button'
        );
        fixture.whenStable().then(() => {
          const finalLength: number = nativeElement.querySelectorAll(
            '.highlight'
          ).length;
          expect(finalLength).toBe(initialLength + 1);
        });
        button.click();
        fixture.detectChanges();
      }));
    });
    describe('remove highlight button', () => {
      it('should remove the highlight', async(() => {
        const initialLength: number = nativeElement.querySelectorAll(
          '.highlight'
        ).length;
        const button: HTMLButtonElement = nativeElement.querySelector(
          '#highlight-0-remove-button'
        );
        fixture.whenStable().then(() => {
          const finalLength: number = nativeElement.querySelectorAll(
            '.highlight'
          ).length;
          expect(finalLength).toBe(initialLength - 1);
        });
        button.click();
        fixture.detectChanges();
      }));
    });
  });
});
