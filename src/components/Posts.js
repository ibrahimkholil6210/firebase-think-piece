import React from "react";
import Post from "./Post";
import AddPost from "./AddPost";

const Posts = ({ posts, onCreate, onDelete }) => {
  return (
    <section className='Posts'>
      <AddPost onCreate={onCreate} />
      {posts.map((post) => {
        return <Post {...post} key={post.id} onDelete={onDelete} />;
      })}
    </section>
  );
};

export default Posts;
