import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResumeService } from '@app/shared/services/resume.service';
import { Volunteer } from '@models/experience.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
})
export class VolunteerComponent implements OnInit, OnDestroy {
  volunteerList: Volunteer[] = [];
  private getVolunteerSubscription: Subscription;
  static sortVolunteerList(firstItem: Volunteer, secondItem: Volunteer) {
    const firstStartDate = firstItem.startDate ? firstItem.startDate : '';
    const secondStartDate = secondItem.startDate ? secondItem.startDate : '';
    return firstStartDate.localeCompare(secondStartDate);
  }

  constructor(private resumeService: ResumeService) {}

  ngOnInit() {
    this.getVolunteerSubscription = this.resumeService
      .getVolunteer$()
      .subscribe(
        (volunteerList: Volunteer[]) =>
          (this.volunteerList = volunteerList.sort(
            VolunteerComponent.sortVolunteerList
          ))
      );
  }

  addVolunteer() {
    this.volunteerList.push({
      organization: null,
      position: null,
      startDate: null,
      endDate: null,
      summary: null,
      url: null,
      highlights: [],
    });
  }

  trackByFn(index: number) {
    return index;
  }

  updateVolunteer(volunteer: Volunteer, index: number) {
    const volunteerPayload = this.volunteerList;
    volunteerPayload[index] = volunteer;
    this.resumeService.setVolunteer(volunteerPayload);
  }

  ngOnDestroy(): void {
    if (this.getVolunteerSubscription) {
      this.getVolunteerSubscription.unsubscribe();
    }
  }
}
