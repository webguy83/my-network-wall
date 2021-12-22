export interface IPost {
  username: string;
  imageURL: string;
  text: string;
  likes: string[];
  comments: IComment[];
  id?: number;
}

interface IComment {
  username: string;
  comment: string;
}
