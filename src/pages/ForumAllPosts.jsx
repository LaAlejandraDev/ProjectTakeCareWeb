import { samplePosts } from "../data/Post";
import Post from "../components/Forum/Post";

export default function ForumAllPosts() {
  return (
    <>
      {samplePosts.map((post, index) => (
        <Post
          key={index}
          id={post.id}
          title={post.title}
          author={post.author}
          avatar={post.avatar}
          date={post.date}
          userRole={post.userRole}
          content={post.content}
          likes={post.likes}
          postType={post.postType}
          comments={post.comments}
        />
      ))}
    </>
  );
}
