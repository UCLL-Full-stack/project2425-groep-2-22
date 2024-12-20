const getAllPosts = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
      return fetch(process.env.NEXT_PUBLIC_API_URL + '/post',{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          }
    })
}
const createPost = (postData: {
    title: string;
    description: string;
    rating: number;
    user: { id: number | null };
  }) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
  };
  

const PostService = {
    getAllPosts, createPost
}
export default PostService;