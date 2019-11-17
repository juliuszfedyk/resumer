import { TestBed } from '@angular/core/testing';

import { ResumeService } from './resume.service';
import { Basics } from '@models/basics.model';
import { emptyResume } from '@app/shared/defaults/empty-resume';
import { Work } from '@models/experience.model';

describe('ResumeService', () => {
  let service: ResumeService;
  beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ResumeService]
      });
      service = TestBed.get(ResumeService);
      console.log(service.resume.basics.name);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBasic$', () => {
    it('should return an observable of Basics', (done) => {
      service.getBasics$().subscribe((basics: Basics) => {
        expect(basics.hasOwnProperty('email')).toBeTruthy();
        expect(basics.hasOwnProperty('label')).toBeTruthy();
        expect(basics.hasOwnProperty('name')).toBeTruthy();
        expect(basics.hasOwnProperty('summary')).toBeTruthy();
        done();
      });
    });
  });
  describe('setBasic', () => {
    it('should modify the basic part of resume', (done) => {
      const payload = emptyResume.basics;
      payload.name = 'Test Name';
      service.setBasics(payload);
      service.getBasics$().subscribe((basics: Basics) => {
        expect(basics.name).toBe('Test Name');
        done();
      });
    });
  });
  describe('getWork$', () => {
    it('should return observable of Work', (done) => {
      service.getWork$().subscribe((workList: Work[]) => {
        expect(workList.length).toBe(0);
        done();
      });
    });
  });
  describe('setWork', () => {
    it('should set the work list', () => {
      service.setWork([
        {
          position: 'test',
          company: 'test',
          startDate: '2011-11-11',
          endDate: '2012-12-12',
          summary: 'test',
          url: 'test',
          highlights: ['highlight'],
        }
      ]);
      service.getWork$().subscribe((workList: Work[]) => {
        expect(workList[0].company).toBe('test');
        expect(workList[0].startDate).toBe('2011-11-11');
        expect(workList[0].summary).toBe('test');
      });
    });
  });
});
