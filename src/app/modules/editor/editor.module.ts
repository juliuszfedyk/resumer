import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './components/editor/editor.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { BasicsComponent } from './components/basics/basics.component';
import { LocationComponent } from './components/location/location.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { CountryInputComponent } from './components/country-input/country-input.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { AccordionListComponent } from './components/accordion-list/accordion-list.component';
import { EducationComponent } from './components/education/education.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      { path: 'basics', component: BasicsComponent },
      { path: 'work', component: AccordionListComponent },
      { path: 'volunteer', component: AccordionListComponent },
      { path: 'education', component: AccordionListComponent },
    ],
  },
];

@NgModule({
  declarations: [
    EditorComponent,
    BasicsComponent,
    LocationComponent,
    ProfilesComponent,
    CountryInputComponent,
    ExperienceComponent,
    AccordionListComponent,
    EducationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class EditorModule {}
