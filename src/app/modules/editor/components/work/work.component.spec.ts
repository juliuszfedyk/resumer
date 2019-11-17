import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkComponent } from './work.component';
import { Component, Input, Output } from '@angular/core';
import { ResumeService } from '@app/shared/services/resume.service';
import { MockResumeService, mockWorkList } from '@app/shared/services/resume.service.mock';
import { Work } from '@models/experience.model';
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

describe('WorkComponent', () => {
  let component: WorkComponent;
  let fixture: ComponentFixture<WorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkComponent, MockExperienceComponent],
      imports: [NgbAccordionModule],
      providers: [{ provide: ResumeService, useClass: MockResumeService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should call the ResumeService getWork$', () => {
      const service = fixture.debugElement.injector.get(ResumeService);
      const spy = spyOn(service, 'getWork$').and.callThrough();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
    it('should sort the work array by startDate', async(() => {
      const spy = spyOn(WorkComponent, 'sortWorkList').and.callThrough();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(component.workList[0].startDate).toBe('2012-11-10');
      });
      fixture.detectChanges();
    }));
  });
  describe('UI elements:', () => {
    beforeEach(async(() => fixture.detectChanges()));
    let componentInstance;

    describe('#add-work-button', () => {
      it('should add new work item on click', async(() => {
        componentInstance = component;
        const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
          '#add-work-button'
        );
        const initialWorkCount = component.workList.length;
        fixture.whenStable().then(() => {
          const panelCount = fixture.debugElement.nativeElement.querySelectorAll(
            '.work__panel-header'
          ).length;
          expect(component.workList.length).toBe(initialWorkCount + 1);
          expect(panelCount).toBe(initialWorkCount + 1);
        });
        button.click();
        fixture.detectChanges();
      }));
    });
    describe('panel title', () => {
      it('should have correct format', () => {
        const headerText = fixture.debugElement.nativeElement.querySelector('.work__panel-toggle-button').innerText;
        const { startDate, endDate, position, company } = component.workList[0];
        expect(headerText.trim()).toBe(`${startDate} - ${endDate} | ${position} - ${company}`);

      });
    });
    describe('#remove-profile-button-', () => {
      it('should remove the work item on click', async(() => {
        const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
          '#remove-profile-button-0'
        );
        const initialWorkCount = component.workList.length;
        fixture.whenRenderingDone().then(() => {
          const panelCount = fixture.debugElement.nativeElement.querySelectorAll(
            '.work__panel-header'
          ).length;
          expect(component.workList.length).toBe(initialWorkCount - 1);
          expect(panelCount).toBe(initialWorkCount - 1);
          expect(
            component.workList.find(
              (work: Work) => work.company === 'company one'
            )
          ).toBeFalsy();
        });
        button.click();
        fixture.detectChanges();
      }));
    });
  });
  describe('updateWork', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
    }));
    it('should call the ResumeService setWork', () => {
      const service = fixture.debugElement.injector.get(ResumeService);
      const spy = spyOn(service, 'setWork');
      component.updateWork(mockWorkList[0], 0);
      expect(spy).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.objectContaining(({company: mockWorkList[0].company}))]));
    });
    it('should modify the work item in the workList', () => {
      const initialWorkItem = component.workList[0];
      const  mockWorkItem = mockWorkList[0];
      const newCompanyName = 'testing company';
      mockWorkItem.company = newCompanyName;
      component.updateWork(mockWorkItem, 0);
      expect(component.workList[0].company).toBe(newCompanyName);
      expect(component.workList[0]).not.toBe(initialWorkItem);
    });
  });
});
