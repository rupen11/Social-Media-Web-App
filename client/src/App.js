import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import socialContext from "./context/socialContext";
import { useDispatch } from "react-redux";
import { getUser } from "./actions";
import Error from "./pages/error/Error";


function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const context = useContext(socialContext);
  const { getUserData } = context;

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await getUserData();
      if (!res) {
        history.push("/Login");
      }
      else {
        dispatch(getUser(res.data));
      }
    }
    getUserDetails();
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/profile/:username">
          <Profile />
        </Route>
        <Route exact path="/messenger">
          <Messenger />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
