import React from 'react'
import './App.css';
import TodoList from './components/TodoList'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OldLists from './components/OldLists';

function App() {
  return (
    <BrowserRouter>
    <Routes>
            <Route path='/' element={<TodoList />}/>
            <Route path='/marketlists' element={<OldLists />}/>
          </Routes>
    </BrowserRouter>
  )
}

export default App;
