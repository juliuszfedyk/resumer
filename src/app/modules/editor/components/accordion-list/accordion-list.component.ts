import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Volunteer, Work } from '@models/experience.model';
import { Education } from '@models/education.model';
import { ResumeService } from '@app/shared/services/resume.service';
import { Observable, Subscription } from 'rxjs';
import {
  getEmptyEducation,
  getEmptyVolunteer,
  getEmptyWork,
} from '@app/shared/defaults/empty-resume';

type AccordionListItem = Work | Volunteer | Education;

@Component({
  selector: 'app-accordion-list',
  templateUrl: './accordion-list.component.html',
  styleUrls: ['./accordion-list.component.scss'],
})
export class AccordionListComponent implements OnInit, OnDestroy {
  getTitle: (item: AccordionListItem) => string;
  items: Array<AccordionListItem> = [];
  private getItems$: () => Observable<Array<AccordionListItem>>;
  private setItems: (education: Array<AccordionListItem>) => void;
  private getEmptyItem: () => AccordionListItem;
  private itemsSubscription: Subscription;
  static sortItems(firstItem: AccordionListItem, secondItem: AccordionListItem) {
    const firstStartDate = firstItem.startDate ? firstItem.startDate : '';
    const secondStartDate = secondItem.startDate ? secondItem.startDate : '';
    return firstStartDate.localeCompare(secondStartDate);
  }

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService
  ) {}

  get path(): string {
    return this.route.snapshot.url[0].path;
  }

  ngOnInit() {
    if (this.path === 'education') {
      this.getItems$ = () => this.resumeService.getEducation$();
      this.setItems = (items) => this.resumeService.setEducation(items as Education[]);
      this.getEmptyItem = getEmptyEducation;
      this.getTitle = (education: Education) => {
        return `${education.startDate} - ${education.endDate} | ${education.studyType} in ${education.area} at ${education.institution}`;
      };
    }
    if (this.path === 'work') {
      this.getItems$ = () => this.resumeService.getWork$();
      this.setItems = (items) => this.resumeService.setWork(items as Work[]);
      this.getEmptyItem = getEmptyWork;
      this.getTitle = (work: Work) => {
        return `${work.startDate} - ${work.endDate} | ${work.position} - ${work.company}`;
      };
    }
    if (this.path === 'volunteer') {
      this.getItems$ = () => this.resumeService.getVolunteer$();
      this.setItems = (items) => this.resumeService.setVolunteer(items as Volunteer[]);
      this.getEmptyItem = getEmptyVolunteer;
      this.getTitle = (volunteer: Volunteer) => {
        return `${volunteer.startDate} - ${volunteer.endDate} | ${volunteer.position} - ${volunteer.organization}`;
      };
    }
    this.itemsSubscription = this.getItems$().subscribe(items => {
      this.items = items.sort(AccordionListComponent.sortItems);
    });
  }

  trackByFn(index: number) {
    return index;
  }

  updateItem(item: AccordionListItem, index: number) {
    const itemsPayload = this.items;
    itemsPayload[index] = item;
    this.setItems(itemsPayload);
  }

  addItem() {
    this.items.push(this.getEmptyItem());
  }

  ngOnDestroy(): void {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }
}
