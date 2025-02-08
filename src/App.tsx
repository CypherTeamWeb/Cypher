import React from 'react';
import './App.scss';
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from './Pages/Home';
import { useEffect } from 'react';
import NotFound from './Pages/NotFoundPage';
import WorkTogether from './components/WorkTogether';
import { useSelector } from 'react-redux';
import Login from './Pages/Login';
import { itemsSet, wishlistSet } from "./redux/slices/itemsSlice";
import { useDispatch } from 'react-redux';
import Library from './Pages/Library/Library';
import FullCard from './Pages/FullCard';

const App: React.FC = () => {
  const isLogin = useSelector(IsLoginState);
  const redirect = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0,0);

    dispatch(itemsSet([]))
    dispatch(wishlistSet([]))

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
          <Route path='/Library' element={<Library />} />
          <Route path='/Card/:id' element={<FullCard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export const IsLoginState = (state: any) => state.setting.isLogin;

export default App;