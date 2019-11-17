import { Observable, of } from 'rxjs';
import { Work } from '@models/experience.model';

export class MockResumeService {
  getWork$(): Observable<Work[]> {
    return of([...mockWorkList]);
  }

  setWork(workList: Work[]) {}
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
