import './App.scss';
import { Button, Tabs, Tab } from 'react-bootstrap';
import Login from '../Login';
import { useEffect, useState } from 'react';

/**
 *
 */
export default function App() {

    const [ key, setKey ] = useState('home');

    useEffect(() => {

    }, []);

    function request() {
        fetch('http://localhost:3000/api/users')
            .then(function(response) {
                if(!response.ok) throw response;
                console.log(response.headers)
                return response.json();
            })
            .then(console.log)
    }

    return (
        <div className="App p-3 bg-dark" style={{ minWidth: 400, minHeight: 400 }}>
            <header className="App-header text-white text-center">
                <p>Extension v0.0.1</p>
                <Button variant="light" onClick={request}>Request!</Button>
            </header>
            <Tabs
                id="controlled-tab-example"
                variant="tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                transition={false}
            >
                <Tab eventKey="home" title="Home" className="rounded-bottom bg-white p-3">
                    <Login />
                </Tab>
                <Tab eventKey="profile" title="Profile" className="rounded-bottom bg-white p-3">
                    asdasdasd
                </Tab>
                <Tab eventKey="contact" title="Contact" className="rounded-bottom bg-white p-3" disabled>
                    suksu muksy
                </Tab>
            </Tabs>
        </div>
    );
};
