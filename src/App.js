import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SearchBox from './pages/SearchBox';
import ShowGif from './pages/ShowGIf';
import DataContext from './context/context'
import { useState } from 'react'

function App() {
  const [dataText, setDataText] = useState('');
  const [dataCollection, setDataCollection] = useState([]);
  return (
    <BrowserRouter>
    <DataContext.Provider value={{dataText, setDataText, dataCollection, setDataCollection}}>
      <Routes>
        
          <Route index path="/" element={<SearchBox />}/>
          <Route path="showgif" element={<ShowGif />} />
        
      </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
