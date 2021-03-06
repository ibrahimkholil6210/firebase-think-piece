import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { firestore, auth } from "../config/firebase";

const Post = ({ id, title, content, user, createdAt, stars, comments }) => {
  const postRef = firestore.collection("posts").doc(id);
  const remove = () => postRef.delete().catch((err) => console.log(err));
  const star = () => postRef.update({ stars: stars * 1 + 1 });

  const { uid } = auth.currentUser || {};

  return (
    <article className='Post'>
      <div className='Post--content'>
        <Link to={`/posts/${id}`}>
          <h3>{title}</h3>
        </Link>
        <div>{content}</div>
      </div>
      <div className='Post--meta'>
        <div>
          <p>
            <span role='img' aria-label='star'>
              ⭐️
            </span>
            {stars}
          </p>
          <p>
            <span role='img' aria-label='comments'>
              🙊
            </span>
            {comments}
          </p>
          <p>Posted by {user.displayName}</p>
          <p>{moment(createdAt).calendar()}</p>
        </div>
        <div>
          <button className='star' onClick={star}>
            Star
          </button>
          {user.uid === uid && (
            <button className='delete' onClick={remove}>
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

Post.defaultProps = {
  title: "An Incredibly Hot Take",
  content:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.",
  user: {
    id: "123",
    displayName: "Bill Murray",
    email: "billmurray@mailinator.com",
    photoURL: "https://www.fillmurray.com/300/300",
  },
  createdAt: new Date(),
  stars: 0,
  comments: 0,
};

export default Post;
