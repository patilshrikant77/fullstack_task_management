import React from 'react';
import AppRoutes from './routes/AppRoutes'; // Ensure the path is correct

const App: React.FC = () => {
  return (
    <div className="app-container">
      <AppRoutes />
    </div>
  );
};

export default App;