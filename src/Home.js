import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  //

  return (
    <div className='home'>
      <Link to='/'>
        <h1>Go to app</h1>
      </Link>
    </div>
  );
};

export default Home;
