import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationComponent } from './education.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Education } from '@models/education.model';
import { mockEducationList } from '@app/shared/services/resume.service.mock';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { appTestUtils } from '@tests/test-utils';

const educationProps = [
  'institution',
  'area',
  'studyType',
  'startDate',
  'endDate',
  'gpa',
];

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let mockEducation: Education;
  let mockChange: SimpleChange;
  let mockChanges: SimpleChanges;
  let getCoursesCount: () => number;

  beforeEach(async(() => {
    mockEducation = { ...mockEducationList[0] };
    mockChange = new SimpleChange(null, mockEducation, true);
    mockChanges = { education: mockChange };
    TestBed.configureTestingModule({
      declarations: [EducationComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    getCoursesCount = () =>
      fixture.nativeElement.querySelectorAll('.course').length;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('get coursesFormArray', () => {
    it('should return the course FormArray', () => {
      component.ngOnChanges(mockChanges);
      expect(component.coursesFormArray.at).toBeTruthy();
    });
  });

  describe('On Changes', () => {
    describe('if the change is the first change', () => {
      it('should set a proper form group', () => {
        expect(component.educationFormGroup).toBeFalsy();
        component.ngOnChanges(mockChanges);
        expect(component.educationFormGroup).toBeTruthy();
        appTestUtils.compareModelToFormGroup(
          mockEducation,
          component.educationFormGroup,
          educationProps,
          expect
        );
        appTestUtils.compareModelToFormArray(
          mockEducation.courses,
          component.coursesFormArray,
          expect
        );
      });
    });
    describe('if the change is not the first change', () => {
      beforeEach(() => {
        component.ngOnChanges(mockChanges);
      });
      it('should not re-create the form, but should update the form', () => {
        const mockSubsequentEducation = { ...mockEducationList[1] };
        const mockSubsequentChanges = {
          education: new SimpleChange(
            mockEducation,
            mockSubsequentEducation,
            false
          ),
        };
        const initialFormInstance = component.educationFormGroup;
        component.ngOnChanges(mockSubsequentChanges);
        appTestUtils.compareModelToFormGroup(
          mockSubsequentEducation,
          component.educationFormGroup,
          educationProps,
          expect
        );
        appTestUtils.compareModelToFormArray(
          mockSubsequentEducation.courses,
          component.coursesFormArray,
          expect
        );
        expect(component.educationFormGroup).toBe(initialFormInstance);
      });
    });
  });
  describe('template related', () => {
    beforeEach(async(() => {
      component.ngOnChanges(mockChanges);
      fixture.detectChanges();
    }));
    describe('add course button click', () => {
      it('should add a new course', async(() => {
        const initialLength: number = getCoursesCount();
        const button: HTMLButtonElement = fixture.nativeElement.querySelector(
          '#add-course-button'
        );
        fixture.whenStable().then(() => {
          const finalLength: number = getCoursesCount();
          expect(finalLength).toBe(initialLength + 1);
        });
        button.click();
        fixture.detectChanges();
      }));
    });
    describe('remove course button', () => {
      it('should remove the course', async(() => {
        const initialLength: number = getCoursesCount();
        const button: HTMLButtonElement = fixture.nativeElement.querySelector(
          '#button-remove-course-0'
        );
        fixture.whenStable().then(() => {
          const finalLength: number = getCoursesCount();
          expect(finalLength).toBe(initialLength - 1);
        });
        button.click();
        fixture.detectChanges();
      }));
    });
  });
});
