import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Code } from 'lucide-react';

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explain from './pages/Explain';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-900 text-white">
          <Navbar />
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/explain"
                element={
                  <PrivateRoute>
                    <Explain />
                  </PrivateRoute>
                }
              />
            </Routes>
            <footer className="bg-gray-900 py-4 text-center">
              <p className="text-gray-400 flex items-center justify-center gap-2">
                Crafted with <Code className="h-5 w-5 text-green-500" /> by <span className="font-semibold text-white">Bhavik Rohit</span>
              </p>
            </footer>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;