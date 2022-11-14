import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchVideogame } from '../../redux/actions';

function SearchBar() {
  let dispatch = useDispatch();
  let state = useSelector(state => state.videogames);

  let videoname = state.map(e => e.name)

  // console.log(videoname);

  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value)
  }

  const sendValueInput = () => {
    if (input === "") {
      alert("Empty")
    } else {
      if (videoname.includes(input)) {
        dispatch(searchVideogame(input))
        setInput("")
      } else {
        alert("Videogame not found")
        setInput("")
      }
    }
  }

  return (
    <div className='container-searchbar'>
      <div className='border-searchbar'>
        <input className='input-search' type="text" placeholder='Videogame...' onChange={onChange} value={input} />
        <button className='btn-search' onClick={sendValueInput}>Search</button>
      </div>
    </div>
  )
}

export default SearchBar