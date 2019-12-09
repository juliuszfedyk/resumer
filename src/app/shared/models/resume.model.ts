import { Basics } from '@models/basics.model';
import { Volunteer, Work } from '@models/experience.model';
import { Education } from '@models/education.model';

export interface Resume {
  basics: Basics;
  work: Work[];
  volunteer: Volunteer[];
  education: Education[];
}
