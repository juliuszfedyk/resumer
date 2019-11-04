import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Profile } from '@models/basics.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProfilesComponent),
    multi: true
  }]
})
export class ProfilesComponent implements ControlValueAccessor, OnDestroy {
  profilesFormGroup: FormGroup;
  private profilesChangesSubscription: Subscription;
  private onChange: (profiles: Profile[]) => void;
  private onTouched: () => void;

  constructor(private fb: FormBuilder) {
  }

  get profiles(): FormArray {
    return this.profilesFormGroup.get('profiles') as FormArray;
  }

  writeValue(profiles: Profile[]): void {
    this.profilesFormGroup = this.fb.group({
      profiles:
        this.fb.array(
          profiles.map((profile: Profile) => {
            return this.fb.group({
              network: [profile.network, Validators.required],
              username: [profile.username, Validators.required],
              url: [profile.url, Validators.required],
            });
          })
        )
    });
  }

  registerOnChange(fn: (profiles: Profile[]) => void): void {
    this.onChange = fn;
    this.profilesChangesSubscription = this.profiles.valueChanges.subscribe(this.onChange);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  addProfile() {
    this.profiles.push(this.createProfile());
  }

  removeProfile(index: number) {
    this.profiles.removeAt(index);
  }

  getProfile(index: number): FormGroup {
    return this.profiles.at(index) as FormGroup;
  }

  private createProfile(profile: Profile = { network: null, username: null, url: null }): FormGroup {
    return this.fb.group({
      network: [profile.network, Validators.required],
      username: [profile.username, Validators.required],
      url: [profile.url, Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this.profilesChangesSubscription) {
      this.profilesChangesSubscription.unsubscribe();
    }
  }

}
