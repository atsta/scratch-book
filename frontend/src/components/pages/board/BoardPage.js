import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import styled from 'styled-components';
import classnames from 'classnames';
import pretty from 'pretty';
import { getLinks } from '../../../api';
import copyToClipboard from './copyToClipboard';
import download from './downloadTextAsFile';

/**
 *
 */
class BoardPage extends React.Component {

    state = {
        loading: true,
        error: null,
        items: [],
    };

    render() {

        const { loading, error, items } = this.state;

        if(loading) {
            return this.renderLoadingIndicator();
        }
        else if(error) {
            return this.renderErrorMessage(error);
        }

        return (
            <div className={classnames('container', this.props.className)}>
                <p className="text-white">board page</p>
                <div className="d-flex flex-wrap">{items.map(item =>
                    <div key={item._id} className="mb-3 mr-3 shadow rounded bg-white flex-grow-1 d-flex flex-column
                        card" style={{ width: 300, height: 250 }}
                    >
                        {/********************************************************************************************/}
                        <a href={item.url} target="_blank" className="flex-shrink-0 border-bottom py-2 px-3 d-flex
                            align-items-center card-header" title={item.url}
                        >
                            <span className="text-truncate">{item.url}</span>
                            <span className="ml-2 fa fa-external-link-alt" />
                        </a>
                        {/********************************************************************************************/}
                        <div className="card-body p-1 flex-grow-1 d-flex flex-column">
                            <ul className="flex-shrink-0 nav nav-pills nav-justified" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link rounded-0 py-2 small w-100 border-0 active"
                                            data-toggle="pill" role="tab" href={`#img_${item._id}`}
                                    >Image</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link rounded-0 py-2 w-100 border-0 small"
                                            data-toggle="pill" role="tab" href={`#html_${item._id}`}
                                    >HTML</button>
                                </li>
                            </ul>
                            <div className="flex-grow-1 tab-content overflow-hidden pt-1">
                                <div className="w-100 h-100 tab-pane fade show active p-1 text-center position-relative"
                                     role="tabpanel" id={`img_${item._id}`}
                                >
                                    <img src={item.screenshot} alt="no screenshot" />
                                    <div className="w-100 h-100 rounded position-absolute"
                                         style={{ top: 0, left: 0, boxShadow: 'inset 0 0 25px rgba(0,0,0,.5)',
                                         pointerEvents: 'none' }}
                                    />
                                </div>
                                <div className="w-100 h-100 tab-pane fade position-relative" id={`html_${item._id}`}
                                     role="tabpanel"
                                >
                                    <SyntaxHighlighter language="html" className="w-100 h-100 rounded"
                                    >{item.htmlPrettified}</SyntaxHighlighter>
                                    <button className="position-absolute fa fa-clone rounded py-1 border-0"
                                            title="Copy HTML to clipboard"
                                            onClick={() => copyToClipboard(item.htmlPrettified)}
                                    />
                                    <button className="position-absolute fa fa-download rounded py-1 border-0"
                                            title="Download HTML as file"
                                            onClick={() => download(item.filename, item.htmlPrettified)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/********************************************************************************************/}
                        <div className={`flex-shrink-0 border-top mx-1 ${item.comment ? '' : 'd-none'}`}>
                            <div className="small text-muted">comment</div>
                            <div className="mb-1 small text-truncate" title={item.comment}>{item.comment}</div>
                        </div>
                        {/********************************************************************************************/}
                    </div>
                )}</div>
            </div>
        );
    }

    renderLoadingIndicator() {

        return (
            <div className="mt-5 text-center text-white">
                <span className="fa fa-spinner fa-spin fa-2x" />
            </div>
        );
    }

    renderErrorMessage(error) {

        const message = error.message === 'Failed to fetch'
            ? 'Failed to fetch board contents'
            : error.message;

        return (
            <div className="alert alert-danger">
                {message}
            </div>
        );
    }

    componentDidMount() {

        const { boardId } = this.props.match.params;

        getLinks(boardId)
            .then(({ URLS }) => {
                this.setState({
                    items: URLS.map(url => ({
                        ...url,
                        htmlPrettified: pretty(url.html),
                        filename: `scratchbook-html-snippet.html`,
                    })),
                    loading: false,
                });
            }).catch(error => {
                this.setState({ error, loading: false });
            });
    }
}

const BoardPageStyled = styled(BoardPage)`
    img {
        cursor: pointer;
        opacity: .35;
        transition: opacity .25s ease;
    }
    img:hover {
        opacity: 1;
    }
    
    button.fa-clone {
        bottom: 20px;
        left: 35px;
        opacity: .5;
    }
    button.fa-clone:hover {
        opacity: .75;
    }

    button.fa-download {
        bottom: 20px;
        left: 5px;
        opacity: .5;
    }
    button.fa-download:hover {
        opacity: .75;
    }
`;

export default BoardPageStyled;

