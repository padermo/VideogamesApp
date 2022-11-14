import React from 'react'
import { Route } from 'react-router-dom';
import Videogames from '../Videogames/Videogames'
import CreateVideogames from '../Create/CreateVideogames'
import Header from '../Header/Header';
import Details from '../Detail/Details';
import Footer from '../Footer/Footer';

function Home() {
  return (
    <div className='container-home'>
      <Header/>
      <Route exact path={'/'} render={() => <Videogames />} />
      <Route exact path={'/create-videogames'} render={() => <CreateVideogames />} />
      <Route exact path={'/detail/:id'} render={({ match }) => <Details match={match} />} />
      <Footer/>
    </div>
  )
}

export default Home