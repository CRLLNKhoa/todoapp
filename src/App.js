import './App.css';
import Welcome from './components/welcome';
import Home from './components/Home'
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';


function App() {
  const vertical = 'top';
  const horizontal = 'right'
  return (
   <SnackbarProvider maxSnack={3} autoHideDuration={2000} anchorOrigin={{vertical, horizontal}} >
      <div className="app">
 
        <Router>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Welcome />} />
          </Routes>
        </Router>
      </div>
   </SnackbarProvider>
  );
}

export default App;
