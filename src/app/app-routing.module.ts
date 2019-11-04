import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'edit', loadChildren: () => import('./modules/editor/editor.module').then(mod => mod.EditorModule) },
  { path: '', redirectTo: 'edit', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
