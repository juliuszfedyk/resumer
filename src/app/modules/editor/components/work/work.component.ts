import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResumeService } from '@app/shared/services/resume.service';
import { Work } from '@models/experience.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit, OnDestroy {
  workList: Work[] = [];
  private getWorkSubscription: Subscription;
  static sortWorkList(firstItem: Work, secondItem: Work) {
    const firstStartDate = firstItem.startDate ? firstItem.startDate : '';
    const secondStartDate = secondItem.startDate ? secondItem.startDate : '';
    return firstStartDate.localeCompare(secondStartDate);
  }

  constructor(private resumeService: ResumeService) {}

  ngOnInit() {
    this.getWorkSubscription = this.resumeService
      .getWork$()
      .subscribe(
        (workList: Work[]) =>
          (this.workList = workList.sort(WorkComponent.sortWorkList))
      );
  }

  addWork() {
    this.workList.push({
      company: null,
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

  updateWork(work: Work, index: number) {
    const workPayload = this.workList;
    workPayload[index] = work;
    this.resumeService.setWork(workPayload);
  }

  ngOnDestroy(): void {
    if (this.getWorkSubscription) {
      this.getWorkSubscription.unsubscribe();
    }
  }
}
