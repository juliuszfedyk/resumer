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
import { WorkComponent } from './components/work/work.component';
import { ExperienceComponent } from './components/experience/experience.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      { path: 'basics', component: BasicsComponent },
      { path: 'work', component: WorkComponent },
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
    WorkComponent,
    ExperienceComponent,
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
