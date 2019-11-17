import { Injectable } from '@angular/core';
import { Resume } from '@models/resume.model';
import { Basics } from '@models/basics.model';
import { Observable, of } from 'rxjs';
import { emptyResume } from '@app/shared/defaults/empty-resume';
import { Work } from '@models/experience.model';

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

  setWork(work: Work[]) {
    this.resume = { ...this.resume, work };
  }
}
