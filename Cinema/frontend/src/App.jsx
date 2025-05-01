import './App.css';
import {Routes, Route} from 'react-router-dom';
import AppLayout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout></AppLayout>} />

    </Routes>
    
  );
}

export default App;
