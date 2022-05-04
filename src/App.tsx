import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {useRoutes} from "./hooks/useRoutes";

const App = () => {
  const Routes = useRoutes()

  return (
      <Router>
        {Routes}
      </Router>
  )

}

export default App;
