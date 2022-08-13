import './App.css';
import AllEmploy from './Component/AllEmploy'
import Empoly from './Component/Empoly';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeHierarchical from './Component/EmployeeHierarchical';


function App() {
  return (
    <>
      <Router >
        <Navbar />
        <Routes>
          <Route exact path='/employDetails' element={<Empoly />} />
          <Route exact path='/employHierarchical' element={<EmployeeHierarchical />} />
          <Route exact path='/' element={<AllEmploy />} />
        </Routes>
      </Router >
    </>
  );
}

export default App;
