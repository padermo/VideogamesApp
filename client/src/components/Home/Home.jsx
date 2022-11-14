import React from 'react'
import { Route } from 'react-router-dom';
import Videogames from '../Videogames/Videogames'
import CreateVideogames from '../Create/CreateVideogames'
import Header from '../Header/Header';

function Home() {
  return (
    <div>
      <Header/>
      <Route exact path={'/'} render={() => <Videogames />} />
      <Route exact path={'/create-videogames'} render={()=> <CreateVideogames/>} />
    </div>
  )
}

export default Home