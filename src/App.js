import './App.css';
import SignupForm from './components/Signup';
import CreateProject from './components/CreateProject/CreateProject';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/create-project" element={<CreateProject />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
