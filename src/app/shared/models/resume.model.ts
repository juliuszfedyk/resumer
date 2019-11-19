import { Basics } from '@models/basics.model';
import { Volunteer, Work } from '@models/experience.model';

export interface Resume {
  basics: Basics;
  work: Work[];
  volunteer: Volunteer[];
}
