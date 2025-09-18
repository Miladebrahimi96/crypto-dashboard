import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { Layout } from './core/components';
import { Coin, Coins } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout />
          }
        >
          <Route path="/coins" element={<Coins />} />
          <Route path="/coins/:id" element={<Coin />} />
          <Route path='/' element={<Navigate to="/coins" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
