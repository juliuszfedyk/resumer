import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProfilesComponent } from './profiles.component';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { Profile } from '@models/basics.model';

const mockProfiles: Profile[] = [
  { network: 'Twitter', url: '', username: 'juliuszfedyk' },
  { network: 'LinkedIn', url: '', username: 'JuliuszFedyk'}
];

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilesComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.writeValue([]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('get profiles', () => {
    it('should return FormArray', () => {
      component.writeValue([]);
      expect(component.profiles instanceof FormArray).toBeTruthy();
    });
  });
  describe('writeValue', () => {
    it('should create a FormGroup', () => {
      component.writeValue([]);
      expect(component.profilesFormGroup).toBeTruthy();
    });
    it('should map profiles values to the FormGroup', () => {
      component.writeValue(mockProfiles);
      const profilesArray = component.profilesFormGroup.get('profiles') as FormArray;
      expect(profilesArray.at(0).get('network').value).toBe('Twitter');
      expect(profilesArray.at(0).get('username').value).toBe('juliuszfedyk');
      expect(profilesArray.at(0).get('url').value).toBe('');
    });
  });

  describe('add functionality', () => {
    it('should add an empty profile when #add-profile-button is clicked', () => {
      const button = fixture.debugElement.nativeElement.querySelector('#add-profile-button');
      component.writeValue([]);
      const formArray = component.profilesFormGroup.get('profiles') as FormArray;
      button.click();
      expect(formArray.length).toBe(1);
    });
  });
  describe('remove functionality', () => {
    it('should remove the profile when #remove-profile-button-0 button is clicked', fakeAsync(() => {
      component.writeValue(mockProfiles);
      fixture.detectChanges();
      tick(1);
      const button = fixture.debugElement.nativeElement.querySelector('#remove-profile-button-0');
      const formArray = component.profilesFormGroup.get('profiles') as FormArray;
      button.click();
      expect(formArray.length).toBe(1);
      expect(formArray.at(0).get('network').value).toBe('LinkedIn');
    }));
  });

  describe('getProfile', () => {
    it('should return correct Profile', () => {
      component.writeValue(mockProfiles);
      const profile = component.getProfile(1);
      expect(profile.get('network').value).toBe('LinkedIn');
    });
  });
});
