export interface Video {
  description: string;
  caption: string;
  video: string;
  _id: string;
  postedBy: {
    _id: string;
    name: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      name: string;
      image: string;
    };
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];
}

export interface IUser {
  _id: string;
  _type: string;
  name: string;
  image: string;
}
