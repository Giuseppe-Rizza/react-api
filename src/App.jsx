import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

const initialFormData = {
  title: "",
  image: "",
  content: "",
  tags: "",
};

function App() {

  const [postsList, setPostsList] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  function fetchTodos() {
    axios.get("http://localhost:3000/posts/")
      .then((res) => setPostsList(res.data))
  }

  useEffect(fetchTodos, []);

  function handleFormData(e) {

    const value = e.target.name === "tags" ? e.target.value.split(",") : e.target.value;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:3000/posts/", formData)
      .then((res) =>

        setPostsList((currentPost) => [...currentPost, res.data])
      )

      .catch(err => {
        console.log(err)
      })

    setFormData(initialFormData);
  };

  return (
    <>

      <form id='formpost' onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleFormData}
          value={formData.title}
          placeholder='Title'
        />

        <input
          type="text"
          name="image"
          onChange={handleFormData}
          value={formData.image}
          placeholder='Image'
        />

        <input
          type="text"
          name="content"
          onChange={handleFormData}
          value={formData.content}
          placeholder='Content'
        />

        <input
          type="text"
          name="tags"
          onChange={handleFormData}
          value={formData.tags}
          placeholder='Tags'
        />

        <button>Add</button>
      </form>

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