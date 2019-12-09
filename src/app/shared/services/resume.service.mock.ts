import { Observable, of } from 'rxjs';
import { Volunteer, Work } from '@models/experience.model';
import { Education } from '@models/education.model';

export class MockResumeService {
  getWork$(): Observable<Work[]> {
    return of([...mockWorkList]);
  }

  setWork(workList: Work[]) {}

  getVolunteer$(): Observable<Volunteer[]> {
    return of([...mockVolunteerList]);
  }

  setVolunteer(volunteerList: Volunteer[]) {}

  getEducation$(): Observable<Education[]> {
    return of([...mockEducationList]);
  }
  setEducation(educationList: Education[]) {}
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

export const mockEducationList: Education[] = [
  {
    institution: 'Super Hero University',
    area: 'Super strong hulk',
    studyType: 'Masters',
    startDate: '2017-10-02',
    endDate: '2018-11-01',
    gpa: '1000',
    courses: ['carrying buildings', 'stopping trains', 'inner sensitivity'],
  },
  {
    institution: 'Humanity Saviour College',
    area: 'Intelligent Hero Assistant',
    studyType: 'Bachelor',
    startDate: '2014-02-02',
    endDate: '2017-06-01',
    gpa: '100',
    courses: ['carrying buildings', 'stopping trains', 'inner sensitivity'],
  },
];
