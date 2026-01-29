export interface EarlyAccessFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  challenge: string;
}

export enum UserRole {
  Consultant = 'consultant',
  Developer = 'developer',
  Agricultural = 'ag',
  GCD = 'gcd',
  Other = 'other',
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}