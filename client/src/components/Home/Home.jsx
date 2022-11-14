import React from 'react'
import { Route } from 'react-router-dom';
import Videogames from '../Videogames/Videogames'
import CreateVideogames from '../Create/CreateVideogames'
import Header from '../Header/Header';
import Details from '../Detail/Details';

function Home() {
  return (
    <div>
      <Header/>
      <Route exact path={'/'} render={() => <Videogames />} />
      <Route exact path={'/create-videogames'} render={() => <CreateVideogames />} />
      <Route exact path={'/detail/:id'} render={()=> <Details />} />
    </div>
  )
}

export default Home