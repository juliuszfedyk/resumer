import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('defaults: ', () => {
    it('should set sideNavOpen to true by default', () => {
      expect(component.sideNavOpen).toBeTruthy();
    });

    it('should set proper menu items', () => {
      expect(component.resumeSections).toBeTruthy();
      expect(component.resumeSections[0].title).toBe('Basics');
      expect(component.resumeSections[0].url).toBe('basics');
    });
  });

  describe('sideNav buttons:', () => {
    it('#toggle-side-menu button should open side menu when clicked while menu is closed', async(() => {
      component.sideNavOpen = false;
      fixture.whenStable().then(() => {
        const sideMenu = fixture.debugElement.nativeElement.querySelector('#editor__sidenav');
        expect(component.sideNavOpen).toBeTruthy();
        expect(sideMenu.classList.contains('editor__sidenav--open')).toBeTruthy();
      });
      fixture.debugElement.nativeElement.querySelector('#toggle-side-menu').click();
      fixture.detectChanges();
    }));

    it('#toggle-side-menu button should close side menu when clicked while menu is open', async(() => {
      component.sideNavOpen = true;
      fixture.whenStable().then(() => {
        const sideMenu = fixture.debugElement.nativeElement.querySelector('#editor__sidenav');
        expect(component.sideNavOpen).toBeFalsy();
        expect(sideMenu.classList.contains('editor__sidenav--open')).toBeFalsy();
      });

      fixture.debugElement.nativeElement.querySelector('#toggle-side-menu').click();
      fixture.detectChanges();
    }));

    it('#close-side-menu button should close side menu when clicked', async(() => {
      fixture.whenStable().then(() => {
        const sideMenu = fixture.debugElement.nativeElement.querySelector('#editor__sidenav');
        expect(component.sideNavOpen).toBeFalsy();
        expect(sideMenu.classList.contains('editor__sidenav--open')).toBeFalsy();
      });

      fixture.debugElement.nativeElement.querySelector('#close-side-menu').click();
      fixture.detectChanges();
    }));
  });
});
