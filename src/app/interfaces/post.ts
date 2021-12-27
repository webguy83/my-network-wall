import { IUser } from './user';

export interface IPost {
  username: string;
  createdAt: string;
  imageURL: string;
  text: string;
  likes: IUser[];
  comments: IComment[];
  id: number;
  commentTextArea: string;
}

interface IComment {
  username: string;
  value: string;
}
