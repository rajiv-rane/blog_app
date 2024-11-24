import React, { useContext, useEffect, useState } from 'react';
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axiosInstance from '../utils/axiosInstance.js';
import moment from 'moment';
import { AuthContext } from '../context/authContext.jsx';

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2]; // Get postId from URL path

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${postId}`);
        console.log("Post data fetched: ", res.data); // Debugging output
        setPost(res.data);
      } catch (err) {
        console.log("Error fetching post data: ", err); // Debugging output
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log("Error deleting post: ", err); // Debugging output
    }
  };

  if (!post.title) {
    return <div>Loading...</div>; // Show a loading state while fetching the post
  }

  const getText = (html)=>{
    const doc=new DOMParser().parseFromString(html,"text/html");
    return doc.body.textContent;
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${postId}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  );
};

export default Single;
