import React from 'react';
import { withAuth } from '../contexts/AuthContext';
import { Button } from 'react-bootstrap';
import { fetchBoards } from '../api';

const frontendHost = process.env.REACT_APP_FRONTEND_ORIGIN.replace(/^https?:\/\//, '');

/**
 *
 */
export default withAuth(class Boards extends React.Component {

    state = {
        loading: true,
        error: null,
        boards: [],
        activeBoard: null,
    };
    promise = null;

    handleLogoutClick = event => {

        this.props.auth.logout();
    };

    handleTakeSnapshotClick(event) {

        window.extTakeSnapshotInTab();
    }

    handleBoardClicked = board => {

        this.setState({ activeBoard: board });
    };

    render() {

        const { loading, error, boards, activeBoard } = this.state;

        return (
            <div className="p-3 bg-dark d-flex flex-column" style={{ minWidth: 400, minHeight: 400 }}>
                <header className="text-white text-center mb-3 flex-shrink-0">
                    <div className="Logo text-white pr-3 d-flex justify-content-center align-items-center">
                        <span className="fa fa-book-open fa-2x font-italic" />
                        <span className="ml-3" style={{ fontSize: '1.5em' }}>ScratchBook extension</span>
                    </div>
                </header>
                <div className="flex-shrink-0 alert alert-info d-flex justify-content-between align-items-start p-1 px-2
                    pb-0 mb-2"
                >
                    <span className="fa fa-info-circle mt-1" />
                    <p className="ml-1 small text-left flex-grow-1 mb-1">
                        In order to further manage your boards or your account, please visit{' '}
                        <a href={process.env.REACT_APP_FRONTEND_ORIGIN} target="_blank" rel="noreferrer">
                            {frontendHost}
                        </a>.
                    </p>
                    <Button className="mt-1 ml-2" variant="dark" size="sm" onClick={this.handleLogoutClick}>
                        Logout
                    </Button>
                </div>
                <div className="flex-grow-1 bg-white mb-2 card">
                    <h6 className="card-header text-center">
                        Choose a board to save your snapshot to:
                    </h6>
                    {loading && <div className="text-center"><span className="mt-5 fa fa-spinner fa-spin fa-2x" /></div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <ul className="card-body list-unstyled overflow-auto">{boards.map((board, index) =>
                        <li key={index}>
                            <button className={`w-100 my-1 py-2 px-3 border-0 rounded d-flex justify-content-between
                                align-items-center ${board === activeBoard ? 'bg-success text-white' : 'bg-light'}`}
                                onClick={() => this.handleBoardClicked(board)}
                            >
                                <span>{board.title}</span>
                                <span className={board === activeBoard ? 'fa fa-check' : ''} />
                            </button>
                        </li>
                    )}</ul>
                </div>
                <div className="flex-shrink-0 text-center mb-0">
                    <Button variant="light" onClick={this.handleTakeSnapshotClick} className="px-4"
                        disabled={activeBoard === null}
                        title={activeBoard === null ? 'You must first choose a board' : 'Click to take your snapshot'}
                        style={{ cursor: activeBoard === null ? 'not-allowed' : 'pointer' }}
                    >
                        <span className="fa fa-camera fa-3x" />
                    </Button>
                </div>
            </div>
        );
    }

    componentDidMount() {

        this.promise = fetchBoards()
            .then(boards => {
                this.setState({ boards, loading: false });
            })
            .catch(error => {
                this.setState({ error: error.message, loading: false });
            });
    }

    componentWillUnmount() {

        this.promise && this.promise.cancel();
    }
});

