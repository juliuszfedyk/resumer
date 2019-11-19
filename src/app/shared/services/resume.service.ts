import { Injectable } from '@angular/core';
import { Resume } from '@models/resume.model';
import { Basics } from '@models/basics.model';
import { Observable, of } from 'rxjs';
import { emptyResume } from '@app/shared/defaults/empty-resume';
import { Volunteer, Work } from '@models/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  resume: Resume;

  constructor() {
    this.resume = { ...emptyResume };
  }

  getBasics$(): Observable<Basics> {
    return of({ ...this.resume.basics });
  }

  setBasics(basics: Basics): void {
    this.resume = { ...this.resume, basics };
  }

  getWork$(): Observable<Work[]> {
    return of([...this.resume.work]);
  }

  setWork(workList: Work[]) {
    this.resume = { ...this.resume, work: workList };
  }

  getVolunteer$(): Observable<Volunteer[]> {
    return of({ ...this.resume.volunteer });
  }

  setVolunteer(volunteerList: Volunteer[]) {
    this.resume = { ...this.resume, volunteer: volunteerList };
  }
}
