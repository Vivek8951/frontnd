import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import Mining from './components/Mining';
import Faucet from './components/Faucet';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-primary">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/mining" element={<Mining />} />
              <Route path="/faucet" element={<Faucet />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </Router>
  );
}

export default App;
