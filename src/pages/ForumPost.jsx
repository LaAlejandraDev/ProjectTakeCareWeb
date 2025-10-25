import { useParams } from "react-router-dom";
import { samplePosts } from "../data/Post";
import Post from "../components/Forum/Post";

export default function ForumPost() {
  const { postId } = useParams();
  const post = samplePosts.find((p) => p.id === parseInt(postId));
  return (
    <>
      <Post
        id={post.id}
        avatar={post.avatar}
        title={post.title}
        author={post.author}
        date={post.date}
        userRole={post.userRole}
        content={post.content}
        likes={post.likes}
        comments={post.comments}
        expanded={true}
      />
    </>
  );
}
