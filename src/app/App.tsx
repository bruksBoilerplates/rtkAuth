
import  { Suspense, lazy } from 'react';
import '../App.css';
import axios from "axios";
import { Result, Button } from "antd";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {getToken} from "../api/jwt.service"
import {AuthRoute} from "../utils/auth_route";

import {Spin} from "antd";
import Routes from "../Constants/routes";
const LoginPage = lazy(()=> import("../features/auth/ui/loginWithEmail"));
const SignUpPage = lazy(()=> import("../features/auth/ui/register"));


function App() {

  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${getToken()?.token}`;
    return config;
  });

  return (
      <Router>
        <Suspense fallback={<Spin  size="large"/>} >
          <Switch>
            <Route exact path="/">  < SignUpPage/> </Route>
            <AuthRoute  path={Routes.LOGIN} component={LoginPage}/>
            <Route path={Routes.SIGNUP}><SignUpPage /> </Route>
            <Route path="*"><NotFound /> </Route>




          </Switch>
        </Suspense>
      </Router>
  );
}

export default App;

const NotFound = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
    />
);