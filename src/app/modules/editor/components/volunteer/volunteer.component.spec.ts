import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerComponent } from './volunteer.component';
import { Component, Input, Output } from '@angular/core';
import { ResumeService } from '@app/shared/services/resume.service';
import {
  MockResumeService,
  mockVolunteerList,
} from '@app/shared/services/resume.service.mock';
import { Volunteer } from '@models/experience.model';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-experience',
  template: '',
})
class MockExperienceComponent {
  @Input() experience;
  @Output() experienceChanges;
  @Output() experienceRemoved;
}

describe('VolunteerComponent', () => {
  let component: VolunteerComponent;
  let fixture: ComponentFixture<VolunteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VolunteerComponent, MockExperienceComponent],
      imports: [NgbAccordionModule],
      providers: [{ provide: ResumeService, useClass: MockResumeService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should call the ResumeService getVolunteer$', () => {
      const service = fixture.debugElement.injector.get(ResumeService);
      const spy = spyOn(service, 'getVolunteer$').and.callThrough();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
    it('should sort the volunteer array by startDate', async(() => {
      const spy = spyOn(
        VolunteerComponent,
        'sortVolunteerList'
      ).and.callThrough();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(component.volunteerList[0].startDate).toBe('2012-11-10');
      });
      fixture.detectChanges();
    }));
  });
  describe('UI elements:', () => {
    beforeEach(async(() => fixture.detectChanges()));
    let componentInstance;

    describe('#add-volunteer-button', () => {
      it('should add new volunteer item on click', async(() => {
        componentInstance = component;
        const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
          '#add-volunteer-button'
        );
        const initialVolunteerCount = component.volunteerList.length;
        fixture.whenStable().then(() => {
          const panelCount = fixture.debugElement.nativeElement.querySelectorAll(
            '.volunteer__panel-header'
          ).length;
          expect(component.volunteerList.length).toBe(
            initialVolunteerCount + 1
          );
          expect(panelCount).toBe(initialVolunteerCount + 1);
        });
        button.click();
        fixture.detectChanges();
      }));
    });
    describe('panel title', () => {
      it('should have correct format', () => {
        const headerText = fixture.debugElement.nativeElement.querySelector(
          '.volunteer__panel-toggle-button'
        ).innerText;
        const {
          startDate,
          endDate,
          position,
          organization,
        } = component.volunteerList[0];
        expect(headerText.trim()).toBe(
          `${startDate} - ${endDate} | ${position} - ${organization}`
        );
      });
    });
    describe('#remove-profile-button-', () => {
      it('should remove the volunteer item on click', async(() => {
        const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
          '#remove-profile-button-0'
        );
        const initialVolunteerCount = component.volunteerList.length;
        fixture.whenRenderingDone().then(() => {
          const panelCount = fixture.debugElement.nativeElement.querySelectorAll(
            '.volunteer__panel-header'
          ).length;
          expect(component.volunteerList.length).toBe(
            initialVolunteerCount - 1
          );
          expect(panelCount).toBe(initialVolunteerCount - 1);
          expect(
            component.volunteerList.find(
              (volunteer: Volunteer) =>
                volunteer.organization === 'Organization one'
            )
          ).toBeFalsy();
        });
        button.click();
        fixture.detectChanges();
      }));
    });
  });
  describe('updateVolunteer', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
    }));
    it('should call the ResumeService setVolunteer', () => {
      const service = fixture.debugElement.injector.get(ResumeService);
      const spy = spyOn(service, 'setVolunteer');
      component.updateVolunteer(mockVolunteerList[0], 0);
      expect(spy).toHaveBeenCalledWith(
        jasmine.arrayContaining([
          jasmine.objectContaining({
            organization: mockVolunteerList[0].organization,
          }),
        ])
      );
    });
    it('should modify the volunteer item in the volunteerList', () => {
      const initialVolunteerItem = component.volunteerList[0];
      const mockVolunteerItem = mockVolunteerList[0];
      const newCompanyName = 'testing Organization';
      mockVolunteerItem.organization = newCompanyName;
      component.updateVolunteer(mockVolunteerItem, 0);
      expect(component.volunteerList[0].organization).toBe(newCompanyName);
      expect(component.volunteerList[0]).not.toBe(initialVolunteerItem);
    });
  });
});
