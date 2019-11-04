import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './components/editor/editor.component';
import { RouterModule, Routes } from '@angular/router';
import { BasicsComponent } from './components/basics/basics.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationComponent } from './components/location/location.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { SharedModule } from '@app/shared/shared.module';


const routes: Routes = [
  {
    path: '', component: EditorComponent, children: [
      { path: 'basics', component: BasicsComponent }
    ]
  }
];

@NgModule({
  declarations: [EditorComponent, BasicsComponent, LocationComponent, ProfilesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EditorModule {
}
