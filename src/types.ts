export interface UserType{
  id: number 
  name: string
  email: string 
  password: string
  posts: PostType[];
}

export interface PostType{
    id: string ;
    content: string ;
    createdAt: string; 
    authorId: string;  
    author: UserType
  }