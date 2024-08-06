export interface UserType{
  id: number 
  name: string
  email: string 
  password: string
  posts: PostType[];
}

export interface PostType{
    id: string;
    content: string;
    createdAt: string; 
    authorId: string;  
    author: UserType;
    imageUrl? : string;
    totalLikes : number
  }

export interface NoteType{
  id: string;
  title: string;
  content?: string;
  createdAt: string; 
  authorId: string;  
  author: UserType;
  imageUrl? : string;
  totalLikes : number
}

export interface BookType{
  id: string;
  title: string;
  content?: string;
  createdAt: string; 
  authorId: string;  
  author: UserType;
  imageUrl? : string;
  totalLikes : number
}


