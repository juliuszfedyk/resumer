import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Experience } from '@models/experience.model';
import { Subscription } from 'rxjs';
import { dateStringFormat } from '@app/modules/editor/formats';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnChanges, OnDestroy {
  @Input() experience: Experience;
  @Output() experienceChange = new EventEmitter<Experience>();
  @Output() experienceRemove = new EventEmitter();
  experienceFormGroup: FormGroup;
  entityLabel: string;
  formValueUpdatesSubscriptions: Subscription;

  constructor(private fb: FormBuilder) {}

  get highlightsFormArray(): FormArray {
    return this.experienceFormGroup.get('highlights') as FormArray;
  }

  set highlights(highlights: string[]) {
    this.experienceFormGroup.setControl(
      'highlights',
      new FormArray(
        highlights.map((highlight: string) => {
          return new FormControl(highlight);
        })
      )
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue: currentExperience, firstChange } = changes.experience;
    if (firstChange) {
      this.setupFormGroup(currentExperience);
    } else {
      Object.keys(currentExperience).forEach(key => {
        if (key === 'highlights') {
          this.highlights = currentExperience.highlights;
        } else {
          this.experienceFormGroup.get(key).patchValue(currentExperience[key]);
        }
      });
      this.experienceFormGroup.patchValue(changes.experience.currentValue);
    }
  }

  getHighlightControl(index: number): FormControl {
    return this.highlightsFormArray.at(index) as FormControl;
  }

  addHighlightControl() {
    this.highlightsFormArray.push(this.fb.control(null));
  }

  ngOnDestroy(): void {
    this.clearSubscription();
  }

  private setupFormGroup(experience: Experience) {
    this.experienceFormGroup = this.fb.group({
      position: [experience.position],
      startDate: [experience.startDate, Validators.pattern(dateStringFormat)],
      endDate: [experience.endDate, Validators.pattern(dateStringFormat)],
      summary: [experience.summary],
      url: [experience.url],
    });
    this.highlights = experience.highlights;
    this.entityLabel = experience.hasOwnProperty('company')
      ? 'company'
      : 'organization';
    this.experienceFormGroup.addControl(
      this.entityLabel,
      this.fb.control(experience[this.entityLabel])
    );
    this.clearSubscription();
    this.formValueUpdatesSubscriptions = this.experienceFormGroup.valueChanges.subscribe(
      () => this.experienceChange.emit(this.experienceFormGroup.value)
    );
  }

  private clearSubscription() {
    if (this.formValueUpdatesSubscriptions) {
      this.formValueUpdatesSubscriptions.unsubscribe();
    }
  }
}
