import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import Home from './pages/home/Home';
import Faq from './pages/faq/Faq';
import About from './pages/about/About';
import Navbar from './navbar/Navbar';
import NotFound from './pages/not-found/NotFound';

/**
 *
 */
export default function App() {

    return (
        <div className="w-100 h-100 d-flex flex-column bg-secondary">
            <Router>
                <Navbar className="flex-shrink-0" />
                <div className="flex-grow-1 mt-2 p-2 shadow bg-dark">
                    <Switch>
                        <Route path={['/', 'home']} exact={true} component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/faq" component={Faq} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};
