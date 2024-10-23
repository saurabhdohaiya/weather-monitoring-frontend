import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import WeatherDetailPage from './components/WeatherDetailPage';
import { TemperatureProvider } from './contexts/TempratureUnitContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router>
      <TemperatureProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:city_id" element={<WeatherDetailPage />} />
        </Routes>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
          />
      </Layout>
      </TemperatureProvider>
    </Router>
  );
};

export default App;
