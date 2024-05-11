import React from 'react';
import './Post.css'
import TimeAgo from 'react-timeago'

const Post = ({title,summary,content,cover,createdAt,author}) => {
    return (
        <div className='post'>
            <div className="image">
                <img src='https://cdn.thewirecutter.com/wp-content/media/2022/10/drones-2048px-0698.jpg'/>
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

    );
}

export default Post;
