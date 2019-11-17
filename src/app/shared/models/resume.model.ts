import { Basics } from '@models/basics.model';
import { Work } from '@models/experience.model';

export interface Resume {
  basics: Basics;
  work: Work[];
}
