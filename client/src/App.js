import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContextProvider } from './UserContext';
import CreatePage from './pages/CreatePage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <UserContextProvider>
    <div>
      <Navbar/>
      <Routes>
        <Route path={"/"} exact index element={<Blogs/>} />
        <Route path={"/login"} exact element={<Login/>}/>
        <Route path={"/register"} exact element={<Register/>}/>
        <Route path={"/create"} exact element={<CreatePage/>}/>
        <Route path={'/post/:id'} element = {<PostPage/>}></Route>
      </Routes>
    </div>
    </UserContextProvider>
  );
}

export default App;
