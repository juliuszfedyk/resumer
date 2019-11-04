import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '@app/shared/services/resume.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  exports: [
    NgbTypeaheadModule
  ],
  imports: [
    CommonModule,
    NgbTypeaheadModule
  ],
  providers: [
    ResumeService
  ]
})
export class SharedModule {
}
