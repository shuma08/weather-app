import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import LayoutPage from './pages/layoutPage';
import { AppRoutes } from './utils/routes';
import "./styles.scss"
const { HOME_PAGE } = AppRoutes;


function App() {
  return (
    <Routes>
      <Route path={HOME_PAGE} element={<LayoutPage />} >
        <Route path={HOME_PAGE} element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
