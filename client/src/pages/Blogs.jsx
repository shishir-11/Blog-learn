import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import './Blogs.css'

const Blogs = () => {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch('https://server-production-359e.up.railway.app/post');
                const posts = await response.json();
                setPosts(posts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        // Fetch data initially
        fetchData();
    
        // Fetch data every second
        const intervalId = setInterval(fetchData, 10000);
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    return (
        <main>
            <div className="poster">
                {posts.length>0 && posts.map(post=>(
                    <Post {...post}/>
                ))}
            </div>
        </main>
    );
}

export default Blogs;
