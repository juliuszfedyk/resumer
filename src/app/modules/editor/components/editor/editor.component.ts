import { Component } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  sideNavOpen = true;
  resumeSections = [
    { title: 'Basics', url: 'basics' },
    { title: 'Work', url: 'work' },
    { title: 'Volunteer', url: 'volunteer' },
    { title: 'Education', url: 'education' },
    { title: 'Awards', url: 'awards' },
    { title: 'Publications', url: 'publications' },
    { title: 'Skills', url: 'skills' },
    { title: 'Languages', url: 'languages' },
    { title: 'References', url: 'references' },
    { title: 'Projects', url: 'projects' },
  ];
}
