export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
    _id,
    description,
     caption,
       video,
      postedBy->{
        _id,
        name,
        image
      },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      name,
      image
    },
  }
  }`;

  return query;
};

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    _id,
     caption,
       video,
        
        
        
        
      
      userId,
    postedBy->{
      _id,
      name,
      image
    },
     likes[]->{
      _ref,
      _key
     },
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;
  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && (caption match '*${searchTerm}*' || topic match '*${searchTerm}*')]| order(_createdAt desc) {
    _id,
    description,
     caption,
       video,
      postedBy->{
        _id,
        name,
        image
      },
    likes,
  
  }`;
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;

  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && postedBy._ref == '${userId}'] | order(_createdAt desc){
    _id,
    description,
     caption,
       video,

    postedBy->{
      _id,
      name,
      image
    },
 likes[]->{
  
     
      _id,
      name,
      image
    
    
  
 },

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      name,
      image
    },
    }
  }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     caption,
       video,
    postedBy->{
      _id,
      name,
      image
    },

    
  }`;

  return query;
};

export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*'] {
    _id,
     caption,
       video
        
        
        
        
      
      userId,
    postedBy->{
      _id,
      name,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      name,
      image
    },
    }
  }`;

  return query;
};
