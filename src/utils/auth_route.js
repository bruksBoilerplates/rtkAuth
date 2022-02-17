import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IsAuthenticated} from "../features/auth/auth.selectors";


export const AuthRoute = ({ component: Component,  ...rest }) => {
    const state = useSelector(state => state)
    const authenticated =IsAuthenticated(state);
    return(
    <Route
        {...rest}
        render={(props) =>
            authenticated === true ? <Redirect to="/" /> : <Component {...props} />
        }
    />
)};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const state = useSelector(state => state)
    const authenticated =IsAuthenticated(state);
    return (
    <Route
        {...rest}
        render={(props) =>
            authenticated === true ? <Component {...props} /> :<Redirect to="/login" />
        }
    />
)};

export default ProtectedRoute;