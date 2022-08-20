import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import BookDetails from './pages/BookDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App flex flex-col min-h-screen text-gray-600">
      
      <BrowserRouter>
        <Header />
        <div className="flex-1 max-w-3xl w-full mx-auto">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/book-details" element={<BookDetails />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
