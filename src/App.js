import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './components/Root/Root';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
