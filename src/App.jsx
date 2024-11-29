import './App.scss';
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from './Pages/Home';
import { useEffect } from 'react';
import NotFound from './Pages/NotFoundPage';
import WorkTogether from './components/WorkTogether';
import { useSelector } from 'react-redux';
import Login from './Pages/Login';

export default function App() {
  const isLogin = useSelector((state) => state.setting.isLogin);
  const redirect = useNavigate( )

  useEffect(() => {
    window.scrollTo(0,0);

    if(!isLogin){
      return redirect('Login')
    }
  }, [])

  return (
    <>   
      <div className="wrapper">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/WorkTogether' element={<WorkTogether />} />
          <Route path='/Login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}