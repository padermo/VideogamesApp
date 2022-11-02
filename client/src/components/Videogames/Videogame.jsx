import React from 'react'

function Videogame({ name, image }) {
  return (
    <div className='container-videogame'>
      <div className="container-img-videogame">
        <img src={image} alt={`Imagen de ${name}`} />
      </div>
      <div className="container-info-videogame">
        <h1>{name}</h1>
        <div className="container-genre-videogame">
          <label>{}</label>
        </div>
      </div>
    </div>
  )
}

export default Videogame