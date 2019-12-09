import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionListComponent } from './accordion-list.component';
import { ResumeService } from '@app/shared/services/resume.service';
import {
  mockEducationList,
  MockResumeService,
} from '@app/shared/services/resume.service.mock';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

function setRoutePath(
  path: string,
  fixture: ComponentFixture<AccordionListComponent>
) {
  const route = fixture.debugElement.injector.get(ActivatedRoute);
  route.snapshot.url[0].path = path;
}

@Component({
  selector: 'app-experience',
  template: '',
})
class MockExperienceComponent {
  @Input() experience;
  @Output() experienceChanges = new EventEmitter();
  @Output() experienceRemoved;
}

@Component({
  selector: 'app-education',
  template: '',
})
class MockEducationComponent {
  @Input() education;
  @Output() educationChanges = new EventEmitter();
  @Output() educationRemove;
}

const mockActivatedRoute = {
  get snapshot() {
    return { url: [{ path: 'work' }] };
  },
};

describe('AccordionListComponent', () => {
  let component: AccordionListComponent;
  let fixture: ComponentFixture<AccordionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccordionListComponent,
        MockExperienceComponent,
        MockEducationComponent,
      ],
      providers: [
        { provide: ResumeService, useClass: MockResumeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      imports: [NgbAccordionModule, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On Init', () => {
    it('should sort the work array by startDate', async(() => {
      const spy = spyOn(AccordionListComponent, 'sortItems').and.callThrough();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(component.items[0].startDate).toBe('2012-11-10');
      });
      fixture.detectChanges();
    }));
    describe('while listing work', () => {
      beforeEach(() => {
        setRoutePath('work', fixture);
      });
      it('should call the ResumeService getWork$', () => {
        const service = fixture.debugElement.injector.get(ResumeService);
        const spy = spyOn(service, 'getWork$').and.callThrough();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('while listing education', () => {
      beforeEach(() => {
        setRoutePath('education', fixture);
      });
      it('should call the ResumeService getEducation$', () => {
        const service = fixture.debugElement.injector.get(ResumeService);
        const spy = spyOn(service, 'getEducation$').and.callThrough();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('while listing volunteer', () => {
      beforeEach(() => {
        setRoutePath('volunteer', fixture);
      });
      it('should call the ResumeService getVolunteer$', () => {
        const service = fixture.debugElement.injector.get(ResumeService);
        const spy = spyOn(service, 'getVolunteer$').and.callThrough();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
      });
    });
  });
  describe('after ngOnInit', () => {
    describe('#add-item-button', () => {
      beforeEach(async(() => fixture.detectChanges()));
      it('should add a new experience component on click', async(() => {
        const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
          '#add-item-button'
        );
        const initialItemCount = component.items.length;
        const initialPanelCount = fixture.debugElement.nativeElement.querySelectorAll(
          '.accordion-list__panel-header'
        ).length;
        fixture.whenStable().then(() => {
          const panelCount = fixture.debugElement.nativeElement.querySelectorAll(
            '.accordion-list__panel-header'
          ).length;
          expect(component.items.length).toBe(initialItemCount + 1);
          expect(panelCount).toBe(initialPanelCount + 1);
        });
        button.click();
        fixture.detectChanges();
      }));
    });
    describe('#remove-item-button-', () => {
      beforeEach(async(() => fixture.detectChanges()));
      it('should remove the work item on click', async(() => {
        const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
          '#remove-item-button-0'
        );
        const initialWorkCount = component.items.length;
        const initialPanelCount = fixture.debugElement.nativeElement.querySelectorAll(
          '.accordion-list__panel-header'
        ).length;
        fixture.whenRenderingDone().then(() => {
          const panelCount = fixture.debugElement.nativeElement.querySelectorAll(
            '.accordion-list__panel-header'
          ).length;
          expect(component.items.length).toBe(initialWorkCount - 1);
          expect(panelCount).toBe(initialPanelCount - 1);
        });
        button.click();
        fixture.detectChanges();
      }));
    });
    describe('updateItem', () => {
      beforeEach(async(() => fixture.detectChanges()));
      it('should modify the item', () => {
        const initialItem = component.items[0];
        const mockItem = mockEducationList[0];
        const newStartDate = '2021-12-21';
        mockItem.startDate = newStartDate;
        component.updateItem(mockItem, 0);
        expect(component.items[0].startDate).toBe(newStartDate);
        expect(component.items[0]).not.toBe(initialItem);
      });
    });
    describe('panel title', () => {
      describe('while listing work', () => {
        beforeEach(() => {
          setRoutePath('work', fixture);
          fixture.detectChanges();
        });
        it('should have correct format', () => {
          const headerText = fixture.debugElement.nativeElement.querySelector(
            '.accordion-list__panel-toggle-button'
          ).innerText;
          const { startDate, endDate, position, company } = component
            .items[0] as any;
          expect(headerText.trim()).toBe(
            `${startDate} - ${endDate} | ${position} - ${company}`
          );
        });
      });
      describe('while listing volunteer', () => {
        beforeEach(() => {
          setRoutePath('volunteer', fixture);
          fixture.detectChanges();
        });
        it('should have correct format', () => {
          const headerText = fixture.debugElement.nativeElement.querySelector(
            '.accordion-list__panel-toggle-button'
          ).innerText;
          const { startDate, endDate, position, organization } = component
            .items[0] as any;
          expect(headerText.trim()).toBe(
            `${startDate} - ${endDate} | ${position} - ${organization}`
          );
        });
      });
      describe('while listing education', () => {
        beforeEach(() => {
          setRoutePath('education', fixture);
          fixture.detectChanges();
        });
        it('should have correct format', () => {
          const headerText = fixture.debugElement.nativeElement.querySelector(
            '.accordion-list__panel-toggle-button'
          ).innerText;
          const { startDate, endDate, studyType, area, institution } = component
            .items[0] as any;
          expect(headerText.trim()).toBe(
            `${startDate} - ${endDate} | ${studyType} in ${area} at ${institution}`
          );
        });
      });
    });
  });
});
