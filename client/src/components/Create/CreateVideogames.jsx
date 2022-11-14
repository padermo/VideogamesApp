import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres } from '../../redux/actions';
import axios from 'axios';

function CreateVideogames() {
  let dispatch = useDispatch();
  let state = useSelector(state => state.genres);

  const [captureInputs, setCaptureInputs] = useState({
    name: "",
    release: "",
    rating: "",
    platform: [],
    image: "",
    genreId: [],
    description: ""
  });

  const platforms = ["PC", "Xbox", "Xbox360", "Xbox ONE", "Xbox S", "Xbox X", "PS3", "PS4", "PS5", "Nintendo Switch"]

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch]);

  const onChange = (e) => {
    setCaptureInputs({
      ...captureInputs, [e.target.name] : e.target.value
    })
  }

  const captureGenre = (e) => {
    setCaptureInputs({
      ...captureInputs,
      genreId: [...new Set([...captureInputs.genreId, e.target.value])]
    })
  }

  const sendData = async (e) => {
    const { name, description, platform, genreId } = captureInputs;
    e.preventDefault();
    if (!name || !description || platform.length === 0 || genreId.length === 0) {
      alert("Empty Data")
    } else {
      await axios.post("http://localhost:3001/videogame", captureInputs)
      alert("Videogame created");
      setCaptureInputs({
        name: "",
        release: "",
        rating: "",
        platform: "",
        image: "",
        genreId: [],
        description: ""
      });
    }
  }
  
  return (
    <div className='containter-create'>
      <div>
        <h1>Create Videogames</h1>
        <form onSubmit={sendData}>
          <label htmlFor="name">Name</label>
          <input id='name' type="text" placeholder='Name Videogame...' name='name' value={captureInputs.name} onChange={onChange} />

          <label htmlFor="release">Release</label>
          <input id='release' type="date" name='release' value={captureInputs.release} onChange={onChange}/>

          <label htmlFor="rating">Rating</label>
          <input type="range" min="1" max="5" name='rating' value={captureInputs.rating} onChange={onChange}/>

          <label htmlFor="platform">Platform</label>
          <select id='platform' name='platform' onChange={onChange}>
            <option value="#" selected disabled>Selected platform</option>
            {
              platforms.sort((a, b) => {
                  if (a < b) return -1
                  if (a > b) return 1
                  return 0
                }).map(e => (
                <option value={e} key={e}>{e}</option>
              ))
            }
          </select>

          <label htmlFor="img">Image</label>
          <input id='img' type="text" placeholder='Url Image...' name='image' value={captureInputs.image} onChange={onChange}/>

          <label htmlFor="genre">Genres</label>
          <select id='genre' name='genreId' onChange={captureGenre}>
            <option value="#">Selected genres</option>
            {
              state.length ?
                state.sort((a, b) => {
                  if (a.name < b.name) return -1
                  if (a.name > b.name) return 1
                  return 0
                }).map(e => (
                  <option value={e.id} key={e.id}>{e.name}</option>
                ))
                :"Loading..."
            }
          </select>

          <div className='container-genres-add'>
            <div className="container-interno-add">

            </div>
          </div>

          <label htmlFor="description">Description</label>
          <textarea id="description" cols="30" rows="10" placeholder='Description...' name='description' value={captureInputs.description} onChange={onChange}></textarea>

          <div className="container-btn-form">
            <button className='btn btn-create' onClick={sendData}>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateVideogames