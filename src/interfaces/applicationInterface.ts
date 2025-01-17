import { STATUS } from '../models/type';

export interface IApplication {
  cv: string;
  title: string;
  linkFb?: string;
  experience: string;
  topic: string;
  status?: STATUS;
}
