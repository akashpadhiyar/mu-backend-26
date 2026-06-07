import React from 'react';
import { BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom'
import Add from './Add';
import Display from './Display';
function App() {
  return (<>
    <Router>
      <Link to='/add'>Add</Link>|
      <Link to='/display'>Display</Link>|
      <Routes>
        <Route path='/' element={<Display />} />
        <Route path='/add' element={<Add />} />
        <Route path='/display' element={<Display />} />
      </Routes>
    </Router>
  </>);
}

export default App;