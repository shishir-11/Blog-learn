import './CreatePage.css'
import ReactQuill from 'react-quill'
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';


const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link"],
        ["clean"],
      ],
    //   handlers: {
    //     image: imageHandler,
    //   },
    },
    clipboard: {
      matchVisual: true,
    },
  }

const formats = ["header","bold","italic","underline","strike","blockquote",
  "list","bullet","indent","link","color","clean",
];


const CreatePage = () => {
    const [title,setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files,setFiles] = useState('')
    const [redirect,setRedirect] = useState(false)

    async function createNewPost(event){
        const data = new FormData();
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        data.set('file',files[0])

        event.preventDefault();
        const response = await fetch('http://localhost:4000/create',{
            method:'POST',
            body: data, 
            credentials:'include',
        })
        if(response.ok){
          setRedirect(true)
        } 
    }
    if(redirect){
      return <Navigate to={'/'}/>
    }
    
    return (
        <form className='create-form' onSubmit={createNewPost}>
            <input type="title" placeholder='Title' onChange={(ev)=>{setTitle(ev.target.value)}}/>
            <input type="summary" placeholder='Summary' onChange={(ev)=>{setSummary(ev.target.value)}} />
            <input type="file" onChange={ev=>setFiles(ev.target.files)}/>
            <ReactQuill value={content} modules={modules} formats={formats} onChange={(newValue)=>{setContent(newValue)}}/>
            <button>Create</button>
        </form>
    );
}

export default CreatePage;
