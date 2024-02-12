export type IContextType = {
  user: IUser;
  isLoading: boolean;
  // isUserLoading: boolean; // Ajoutez cette ligne
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
  };
  
  export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
  };
  
  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
  };

export type IAddComment = {
  userId: string;
  postId: string;
  contenu: string;
}

export type INewStory = {
  userId: string;
  contenu: string;
  file: File[];
};

export type IUpdateStory = {
  storyId: string;
  contenu: string;
  mediaId: string;
  mediaUrl: URL;
  file: File[];
};

export type INewChat = {
  senderId: string;
  receiverId: string;
  message: string;
};

export type INewMessage = {
  chatId: string;
  message: string;
}