
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResultPage from './pages/ResultPage';
import Home from './pages/Home';
import Ranking from './pages/Ranking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />}></Route>
        <Route path="/ResultPage"  element={<ResultPage />}></Route>
        <Route path="/Ranking"  element={<Ranking />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
