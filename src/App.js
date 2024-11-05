import './App.css';
import SignupForm from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
