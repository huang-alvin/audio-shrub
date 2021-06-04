import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from "./components/SplashPage";
import ContentHeader from "./components/ContentHeader";
import MusicForm from "./components/MusicForm";
import MusicPage from "./components/MusicPage";
import { authenticate } from "./store/session";

function App() {
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <ProtectedRoute path="/users/:userId">
        <ContentHeader />
      </ProtectedRoute>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/music">
          <MusicPage />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/upload-music" exact={true}>
          <MusicForm />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <SplashPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
