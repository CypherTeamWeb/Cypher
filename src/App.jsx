import './App.scss';
import {Route, Routes} from "react-router-dom";
import Home from './Pages/Home';
import { useEffect } from 'react';
import NotFound from './Pages/NotFoundPage';
import WorkTogether from './components/WorkTogether';

export default function App() {

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  return (
    <>   
      <div className="wrapper">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/WorkTogether' element={<WorkTogether />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}