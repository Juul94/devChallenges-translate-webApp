import { Routes, Route } from 'react-router-dom';
import './app.module.css';

// Pages
import Home from './home/home';

const App = () => (
    <Routes>
        <Route path='/' element={Home.getLayout(<Home />)} />
    </Routes>
);

export default App;
