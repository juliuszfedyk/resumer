import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Country } from '@models/country.model';
import { ResumeService } from '@app/shared/services/resume.service';
import { Basics } from '@models/basics.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss']
})
export class BasicsComponent implements OnInit, OnDestroy {
  basicsFormGroup: FormGroup;
  countries$: Observable<Country[]>;
  subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.resumeService.getBasics()
        .pipe(
          switchMap((basics: Basics) => {
            const basicsFormGroup = this.fb.group({
              name: [basics.name, [Validators.required]],
              label: [basics.label, [Validators.required]],
              image: [basics.image, [Validators.required]],
              email: [basics.email, [Validators.required, Validators.email]],
              phone: [basics.phone, [Validators.required]],
              url: [basics.url],
              summary: [basics.summary],
              location: this.fb.group({
                address: [basics.location.address],
                postalCode: [basics.location.postalCode],
                city: [basics.location.city],
                countryCode: [basics.location.countryCode],
                region: [basics.location.region]
              }),
              profiles: [basics.profiles]
            });
            this.basicsFormGroup = basicsFormGroup;
            return basicsFormGroup.valueChanges;
          })
        )
        .subscribe((valueChanges: Basics) => {
            this.resumeService.setBasics(valueChanges);
          },
          (error) => {
            console.error('There was an issue with resume data', error);
          })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
