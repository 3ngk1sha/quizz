//import logo from './logo.svg';
import './App.scss';
//import { useDispatch, useSelector } from 'react-redux';
//import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import React from 'react';
import Header from './Component/header/header';
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
const App = () => {

  return (
    <div>

      <div className="app-container">
        <div className='header-container'>
          <Header />
        </div >
        <div className='main-container'>
          <div className='sidenav-container'></div>
          <div className='app-content'></div>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default App;
