
// import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ResultPage from './pages/ResultPage';
import Home from './pages/Home';
import Ranking from './pages/Ranking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
<Route path="/ResultPage"  element={<ResultPage />}></Route>
<Route path="/Ranking"  element={<Ranking />}></Route>
      </Routes>
    </Router>
  );
}



export default App;
