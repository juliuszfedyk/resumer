import {
  Component,
  EventEmitter, Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Education } from '@models/education.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnChanges, OnDestroy {
  @Input() education: Education;
  @Output() educationChange = new EventEmitter<Education>();
  @Output() educationRemove = new EventEmitter();
  educationFormGroup: FormGroup;
  formValueUpdatesSubscription: Subscription;

  constructor(private fb: FormBuilder) {}

  get coursesFormArray(): FormArray {
    return this.educationFormGroup.get('courses') as FormArray;
  }

  set courses(courses: string[]) {
    this.educationFormGroup.setControl(
      'courses',
      new FormArray(courses.map((course: string) => new FormControl(course)))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue: currentEducation, firstChange } = changes.education;
    if (firstChange) {
      this.setupFormGroup(currentEducation);
    } else {
      Object.keys(currentEducation).forEach(key => {
        if (key === 'courses') {
          this.courses = currentEducation.courses;
        } else {
          this.educationFormGroup.get(key).patchValue(currentEducation[key]);
        }
      });
      this.educationFormGroup.patchValue(changes.education.currentValue);
    }
  }

  getCourseControl(index: number): FormControl {
    return this.coursesFormArray.at(index) as FormControl;
  }

  addCourseControl() {
    this.coursesFormArray.push(this.fb.control(null));
  }

  setupFormGroup(education: Education) {
    this.educationFormGroup = this.fb.group({
      institution: [education.institution],
      area: [education.area],
      studyType: [education.studyType],
      startDate: [education.startDate],
      endDate: [education.endDate],
      gpa: [education.gpa],
    });
    this.courses = education.courses;
    this.formValueUpdatesSubscription = this.educationFormGroup.valueChanges.subscribe(
      () => this.educationChange.emit(this.educationFormGroup.value)
    );
  }

  ngOnDestroy(): void {
    this.clearSubscription();
  }

  private clearSubscription() {
    if (this.formValueUpdatesSubscription) {
      this.formValueUpdatesSubscription.unsubscribe();
    }
  }
}
