import { useParams } from 'react-router-dom';
import './PostPage.css'

import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser'

const PostPage = () => {
    const params = useParams();

    const[post,setPost] = useState(null)
    const[date,setDate] = useState('')
    // const [content,setContent] = useState('')

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch(`http://localhost:4000/post/${params.id}`,{
                    method:'GET',
                    credentials:'include'
                })
                if (response.ok) {
                    const data = await response.json()
                    setPost(data)
                    console.log(post);
                    // const createdAt = new Date(post.createdAt);
                    // createdAt.toDateString()
                    // setDate(post.cre.toDateString().split(' ').slice(1).join(' '))
                    // console.log(post.createdAt.toDateString().split(' ').slice(1).join(' '));
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[params])

    if(!post){
        return <></>   
    }
    return (
        <div className='single-post'> 
            <div className='date-tag'>
                <p className='date'>{post.createdAt.split('T')[0]}</p>
                <p className='tag'>GSoC</p>
            </div>
            <hr className='custom-hr'/>

            <div className='header-section'>
                <h1 className='post-title'>{post.title}</h1>
                <div className='author-region'>
                    <img alt="" src="data:image/jpeg;base64,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"/>
                    <p>{post.author.username}</p>
                </div>
                <img alt="" src={post.cover}/>
            </div>
            <div className='content-section'>
                {parse(post.content)}
            </div>
        </div>
    );
}

export default PostPage;
