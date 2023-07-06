export interface IPost {
  image?: string;
  key: number;
  title: string;
  description: string;
  author: IAuthor;
  date: string;
  comments?: Array<IComment>
}

export interface IAuthor {
  key: number;
  name: string;
  lastName: string;
}

export interface IComment {
  text: string;
  key: number;
  date: string;
  author: IAuthor;
}