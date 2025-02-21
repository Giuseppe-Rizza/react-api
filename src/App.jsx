import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  const [postsList, setPostsList] = useState([]);

  function fetchTodos() {
    axios.get("http://localhost:3000/posts/")
      .then((res) => setPostsList(res.data))
  }

  useEffect(fetchTodos, []);

  return (
    <>
      {postsList.length === 0 ? (
        <h1>No posts</h1>) : (
        postsList.map((post) => (
          <div className='box-form' key={post.id}>
            <h2>{post.title}</h2>
            <img src={post.image} alt={post.title} />
            <p>{post.content}</p>
            <p>{post.tags.join(", ")}</p>
            <button onClick={() => removePost(post.id)}>Delete</button>
          </div >
        ))
      )}
    </>
  )
}

export default App