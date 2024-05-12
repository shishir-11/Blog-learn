import React from 'react';
import './Post.css'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom';

const Post = ({title,summary,content,cover,createdAt,author,_id}) => {


    return (
        <Link to={`/post/${_id}`}>
        <div className='post'>
            <div className="image">
                <img src={cover}/>
            </div>
            <div className="text">
                <h2>{title}</h2>
                <div className="info-section">
                    <p>{author.username}</p>
                    <p>{<TimeAgo date={createdAt}/>}</p>
                </div>
                <p className='content'>{summary}</p>
            </div>
        </div>
        </Link>
    );
}

export default Post;
