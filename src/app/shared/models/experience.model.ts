export interface Experience {
  company?: string;
  organization?: string;
  position: string;
  startDate: string;
  endDate: string;
  summary: string;
  url: string;
  highlights: string[];
}

export interface Work extends Experience {
  company: string;
}

export interface Volunteer extends Experience {
  organization: string;
}
