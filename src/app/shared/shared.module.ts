import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '@app/shared/services/resume.service';
import { NgbAccordionModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  exports: [
    NgbTypeaheadModule,
    NgbAccordionModule
  ],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    NgbAccordionModule
  ],
  providers: [
    ResumeService
  ]
})
export class SharedModule {
}
