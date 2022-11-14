import React from 'react'

function Detail({image, name, description, release, rating, platform, genre}) {
  return (
    <div className='container-detail'>
      <div className="container-interno-detail">
        <div className="container-img-detail">
          {/* <img src={image} alt={`Imagen ${name}`} className='img-detail' /> */}
        </div>
        <div className="container-info-detail">
          <h1>{name}</h1>
          <ul>
            <li>Release: <span>{release}</span></li>
            <li>Rating: <span>{rating}</span></li>
            <li>Platform: <span>{platform}</span></li>
            <li>Genres: <span>{genre}</span></li>
          </ul>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Detail