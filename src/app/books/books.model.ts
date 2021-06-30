export interface Books {
  id: string;
  title: string;
  description: string;
  price: number;
  releaseDate?: Date;
  author: {
    id:string,
    fullName:string
  };
}
