import { STATUS } from '../models/type';

export interface IApplication {
  description: string;
  cv: string;
  title: string;
  linkFb?: string;
  experience: string;
  topic: string;
  status?: STATUS;
}
