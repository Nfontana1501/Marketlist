import React from 'react'
import './App.css';
import TodoList from '../src/components/TodoList'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OldLists from './components/OldLists';

function App() {
  return (
    <BrowserRouter>
    <Routes>
            <Route path='/' element={<TodoList />}/>
            <Route path='/oldlists' element={<OldLists />}/>
          </Routes>
    </BrowserRouter>
  )
}

export default App;
