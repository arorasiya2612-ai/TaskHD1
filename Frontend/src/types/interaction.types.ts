//typscript used for defining the types of interaction data structures in the application
//tyscript takes care of the type checking and ensures that the data structures are used correctly throughout the application
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  authorName: string;
  content: string;
  parentCommentId: string | null;
  createdAt: string | null;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
  createdAt: string | null;
}