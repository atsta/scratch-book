import Login from './Login';
import Boards from './Boards';
import AuthContext, { AuthProvider } from '../contexts/AuthContext';

/**
 *
 */
export default function App() {

    return (
        <AuthProvider>
            <AuthContext.Consumer>{({ isLoggedIn }) =>
                isLoggedIn() ? <Boards /> : <Login />
            }</AuthContext.Consumer>
        </AuthProvider>
    );
};
