import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'react-bootstrap';

/**
 *
 */
export default function Boards(props) {

    const { logout } = useAuth();
    let promise = null;

    useEffect(() => {
        return () => { promise && promise.cancel(); };
    }, []);

    function handleLogoutClick(event) {
        promise = logout();
    }

    function handleTakeSnapshotClick(event) {
        window.extTakeSnapshotInTab();
    }

    const frontendHost = process.env.REACT_APP_FRONTEND_ORIGIN.replace(/^https?:\/\//, '');

    return (
        <div className="p-3 bg-dark d-flex flex-column" style={{ minWidth: 400, minHeight: 400 }}>
            <header className="text-white text-center mb-3 flex-shrink-0">
                <div className="Logo text-white pr-3 d-flex justify-content-center align-items-center mb-2">
                    <span className="fa fa-book-open fa-2x font-italic" />
                    <span className="ml-3" style={{ fontSize: '1.5em' }}>ScratchBook extension</span>
                </div>
            </header>
            <section className="flex-shrink-0">
                <div className="alert alert-info d-flex justify-content-between align-items-start p-1 px-2 pb-0 mb-2">
                    <span className="fa fa-info-circle mt-1" />
                    <p className="ml-1 small text-left flex-grow-1 mb-1">
                        In order to further manage your boards or your account, please visit
                        {' '}<a href={process.env.REACT_APP_FRONTEND_ORIGIN} target="_blank">{frontendHost}</a>.
                    </p>
                    <Button className="mt-1 ml-2" variant="dark" size="sm" onClick={handleLogoutClick}>Logout</Button>
                </div>
            </section>
            <section className="flex-shrink-0 text-center mb-2">
                <Button variant="light" onClick={handleTakeSnapshotClick} className="px-4">
                    <span className="fa fa-camera fa-3x" />
                </Button>
            </section>
            <section className="flex-grow-1 bg-white rounded overflow-auto px-2">
                boards...
            </section>
        </div>
    );
};
