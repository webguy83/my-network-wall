import { IUser } from './user';

export interface IPost {
  username: string;
  imageURL: string;
  text: string;
  likes: IUser[];
  comments: IComment[];
  id?: number;
}

interface IComment {
  username: string;
  comment: string;
}
