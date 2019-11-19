import { Observable, of } from 'rxjs';
import { Volunteer, Work } from '@models/experience.model';

export class MockResumeService {
  getWork$(): Observable<Work[]> {
    return of([...mockWorkList]);
  }

  setWork(workList: Work[]) {}

  getVolunteer$(): Observable<Volunteer[]> {
    return of([...mockVolunteerList]);
  }

  setVolunteer(volunteerList: Volunteer[]) {}
}

export const mockWorkList: Work[] = [
  {
    company: 'company two',
    position: 'super hero',
    startDate: '2014-12-01',
    endDate: '2016-07-13',
    summary: 'I was a superhero, costume and everything',
    url: 'http://superheroes-united.comsmos',
    highlights: ['saved a building once', 'gave a lot of autographs'],
  },
  {
    company: 'company one',
    position: 'super star',
    startDate: '2012-11-10',
    endDate: '2014-11-10',
    summary: 'I was a star of the show.',
    url: 'http://another url',
    highlights: ['Had to make out wit Madonna'],
  },
];

export const mockVolunteerList: Volunteer[] = [
  {
    organization: 'organization two',
    position: 'santa helper',
    startDate: '2014-12-01',
    endDate: '2016-07-13',
    summary: 'Building jacks in the box.',
    url: 'http://superheroes-united.comsmos',
    highlights: ['saved a building once', 'gave a lot of autographs'],
  },
  {
    organization: 'organization one',
    position: 'heavy lifter',
    startDate: '2012-11-10',
    endDate: '2014-11-10',
    summary: 'work work work',
    url: 'http://another url',
    highlights: ['Had to make out wit Madonna'],
  },
];
