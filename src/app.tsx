import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "store";
import "global.scss";
import ROUTES from "common/constants/routes";
import Auth from "routes/auth";
import Test from "routes/test";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <React.Suspense fallback="Загрузка">
        <Routes>
          <Route path={ROUTES.auth} element={<Auth />} />
          <Route path="/app" element={<>Система</>} />
          <Route path="/test" element={<Test />} />
          <Route path="/*" element={<Navigate to={ROUTES.auth} />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </Provider>
);

export default App;
