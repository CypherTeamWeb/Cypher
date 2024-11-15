import './App.scss';
import {Route, Routes} from "react-router-dom";
import Home from './Pages/Home';
import { useEffect } from 'react';

// cd gamesWebDev - game web dev; cd Desktop\Python\index-reat-vite - snekaers && main

export default function App() {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <>   
      <div className="wrapper">
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </>
  )
}