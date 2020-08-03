import React from 'react';
import { Footer } from './components/Footer'
import { Posts } from "./components/Posts";
import { Header } from "./components/Header";
import './App.css';

function App() {
  return (
    <div className="App">

      <Header/>

      <Posts/>

      <Footer/>
    </div>
  );
}

export default App;
