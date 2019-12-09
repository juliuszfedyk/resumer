import { Education } from '@models/education.model';
import { Volunteer, Work } from '@models/experience.model';

export const emptyResume = {
  basics: {
    name: '',
    label: '',
    image: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    location: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
    },
    profiles: [],
  },
  work: [],
  volunteer: [],
  education: [],
};

export function getEmptyEducation(): Education {
  return {
    institution: '',
    area: '',
    studyType: '',
    startDate: '',
    endDate: '',
    gpa: '',
    courses: [],
  };
}

export function getEmptyWork(): Work {
  return {
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    summary: '',
    url: '',
    highlights: [],
  };
}

export function getEmptyVolunteer(): Volunteer {
  return {
    organization: '',
    position: '',
    startDate: '',
    endDate: '',
    summary: '',
    url: '',
    highlights: [],
  };
}
