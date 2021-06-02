import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import styled from 'styled-components';
import classnames from 'classnames';
import pretty from 'pretty';
import { getLinks, deleteLink, getBoard, updateLinks } from '../../../api';
import copyToClipboard from './copyToClipboard';
import download from './downloadTextAsFile';
import ItemMenu from './ItemMenu';
import BoardRating from './BoardRating';
import SettingsIcon from '@material-ui/icons/Settings';
import { Refresh } from '@material-ui/icons';
import EditBoards from '../home/User_Home/Edit_Boards';
import TextField from '@material-ui/core/TextField';
import AddLink from '../home/User_Home/AddLink';
import AddIcon from '@material-ui/icons/Add';
import EditLink from '../home/User_Home/EditLink';

/**
 *
 */
class BoardPage extends React.Component {

    state = {
        board: this.props.location.state?.board || null,
        loading: true,
        error: null,
        items: [],
        dialog: null,
        showEditBoardDialog: false,
        showAddLinkDialog: false,
        showEditLinkDialog: false,
    };

    fetchBoardItems() {

        const { boardId } = this.props.match.params;

        return getLinks(boardId)
            .then(({ URLS }) => {
                this.setState({
                    items: URLS.map(url => ({
                        ...url,
                        htmlPrettified: pretty(url.html),
                        filename: `scratchbook-html-snippet.html`,
                        loading: false,
                    })),
                    loading: false,
                });
            }).catch(error => {
                this.setState({ error, loading: false });
            });
    }

    showFullImage = (item, e) => {

        e && e.stopPropagation();
        this.setState({ dialog: { item, type: 'img' } });
    };

    showFullHTML = (item, e) => {

        e && e.stopPropagation();
        this.setState({ dialog: { item, type: 'html' } });
    };

    handleDialogClose = () => {

        this.setState({ dialog: null });
    }

    copyHtmlToClipboard = (item, e) => {

        e.stopPropagation();
        copyToClipboard(item.htmlPrettified);
    };

    downloadHtmlAsFile = (item, e) => {

        e.stopPropagation();
        download(item.filename, item.htmlPrettified);
    };

    handleRemoveItem = itemPosition => {

        const { boardId } = this.props.match.params;
        const formData = new FormData();
        formData.set('position', itemPosition);

        this.setState(state => {
            state.items[itemPosition].loading = true;
            return {};
        });

        deleteLink(boardId, formData)
            .then(response => {
                return this.fetchBoardItems();
            })
            .catch(error => {
                this.setState(state => {
                    state.items[itemPosition].loading = false;
                    return { error };
                });
            });
    };

    handleEditItem = (itemPosition, url, comment) => {

        const { boardId } = this.props.match.params;
        const item = { url, comment, position: itemPosition };
        const fdata = new FormData();
        for(let key in item) {
            fdata.append(key, item[key]);
        }

        this.setState(state => {
            state.items[itemPosition].loading = true;
            return {};
        });

        updateLinks(boardId, fdata)
            .then(response => {
                this.setState(state => {
                    const item = state.items[itemPosition]
                    item.url = url;
                    item.comment = comment;
                    item.loading = false;
                    return {};
                });
            })
            .catch(error => {
                this.setState(state => {
                    state.items[itemPosition].loading = false;
                    return { error };
                });
            })
    };

    handleListRefresh = () => {

        this.setState({ loading: true });
        this.fetchBoardItems();
    };

    handleShowEditBoardDialog = () => {

        this.setState({ showEditBoardDialog: true });
    };

    handleShowAddLinkDialog = () => {

        this.setState({ showAddLinkDialog: true });
    };

    handleLinkAdded = () => {

        this.setState({ loading: true });
        this.fetchBoardItems();
    };

    handleShowEditLinkDialog = itemPosition => {

        this.setState({ showEditLinkDialog: { itemPosition } });
    };

    render() {

        const { loading, board, items, dialog } = this.state;

        return (
            <div className={classnames('container', this.props.className)}>
                {board && <>
                    <div className="d-flex justify-content-between align-items-center pr-3">
                        <div className="d-flex align-items-center">
                            <h4 className="text-white mb-0">{board.title}</h4>
                            <span className={`badge ${board.is_public ? 'badge-success' : 'badge-danger'} ml-2 pb-1`}
                                title="Board visibility"
                            >
                                {board.is_public ? 'public' : 'private'}
                            </span>
                            <BoardRating rating={board.rating} className="ml-2" />
                        </div>
                        <div className="d-flex align-items-center">
                            <Button onClick={this.handleShowEditBoardDialog} style={{ color: 'white' }}
                                endIcon={<SettingsIcon />}
                            >
                                Edit my Board
                            </Button>
                        </div>
                    </div>
                    <div className="mt-1 mb-1 pr-3">
                        <TextField
                            color="primary"
                            value={board.comment}
                            fullWidth
                            label="Comment"
                            variant="filled"
                            InputProps={{
                                readOnly: true,
                                className: "text-white",
                            }}
                        />
                    </div>
                    {/*<hr className="mr-3 bg-secondary" />*/}
                </>}
                {this.renderErrorMessage()}
                <div className="d-flex align-items-center mb-1 pr-3">
                    <span className="text-white-50 small mr-auto">Links:</span>
                    <Button title="Refresh list" onClick={this.handleListRefresh} endIcon={<Refresh />}
                        disabled={loading} style={{ color: 'white' }}
                    />
                    <Button onClick={this.handleShowAddLinkDialog} style={{color: "white"}} endIcon={<AddIcon/>}>
                        Add new Link
                    </Button>
                </div>
                {loading ? this.renderLoadingIndicator() :
                <div className="d-flex flex-wrap">{items.map((item, index) =>
                    <div key={item._id} className="mb-3 mr-3 shadow rounded bg-white flex-grow-1 d-flex flex-column
                        card position-relative" style={{ width: 300, height: 250 }}
                    >
                        {/********************************************************************************************/}
                        <div className="flex-shrink-0 w-100 border-bottom card-header d-flex justify-content-between
                            align-items-center py-1 pl-3 pr-1"
                        >
                            {item.loading ?
                                <span className="fa fa-spinner fa-spin" /> :
                                <a href={item.url} target="_blank" className="flex-grow-1 text-truncate"
                                    title={item.url}
                                >
                                    <span className="mr-1 fa fa-external-link-alt" /> {item.url}
                                </a>
                            }
                            <ItemMenu disabled={item.loading}
                                onRemove={() => this.handleRemoveItem(index)}
                                onEdit={() => this.handleShowEditLinkDialog(index)}
                            />
                        </div>
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
                                     role="tabpanel" id={`img_${item._id}`} onClick={() => this.showFullImage(item)}
                                >
                                    <img src={item.screenshot} alt="no screenshot" title="Click to view whole image" />
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
                                        onClick={e => this.copyHtmlToClipboard(item, e)}
                                    />
                                    <button className="position-absolute fa fa-download rounded py-1 border-0"
                                        title="Download HTML as file"
                                        onClick={e => this.downloadHtmlAsFile(item, e)}
                                    />
                                    <button className="position-absolute fa fa-expand-arrows-alt rounded py-1 border-0"
                                        title="Show HTML"
                                        onClick={e => this.showFullHTML(item, e)}
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
                )}</div>}

                <Dialog open={!!dialog} fullWidth={true} maxWidth={'lg'} onClose={this.handleDialogClose}>
                    <DialogTitle>
                        {dialog?.type === 'img' ? 'Image' : 'HTML'}
                    </DialogTitle>
                    <DialogContent dividers>
                        {(dialog?.type === 'img' &&
                            <img src={dialog.item.screenshot} alt="no screenshot" />
                        ) ||
                        (dialog?.type === 'html' &&
                            <SyntaxHighlighter language="html" className="w-100 h-100 rounded"
                            >{dialog.item.htmlPrettified}</SyntaxHighlighter>
                        ) ||
                        ('')
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                {board && (<>
                    <EditBoards
                        open={this.state.showEditBoardDialog}
                        handleClose={() => { this.setState({ showEditBoardDialog: false }); }}
                        data={items}
                        changeData={items => { /*this.setState({ items });*/ }}
                        Board_info={board}
                        changeBoard={board => { this.setState({ board }); }}
                    />
                    <AddLink
                        open={this.state.showAddLinkDialog}
                        handleClose={() => { this.setState({ showAddLinkDialog: false }); }}
                        addnewLink={this.handleLinkAdded}
                        b_id={board._id}
                    />
                    {console.log(this.state) || ''}
                    <EditLink
                        open={!!this.state.showEditLinkDialog}
                        index={this.state.showEditLinkDialog?.itemPosition}
                        item={this.state.items[this.state.showEditLinkDialog?.itemPosition]}
                        b_id={board._id}
                        changeItem={this.handleEditItem}
                        close_dialog={() => { this.setState({ showEditLinkDialog: false }); }}
                    />
                </>)}
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

    renderErrorMessage() {

        const { error } = this.state;

        if(!error) return '';

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

        const { board } = this.state;

        if(board) {
            this.fetchBoardItems();
        }
        else {
            const { boardId } = this.props.match.params;
            getBoard(boardId).then(board => {
                this.setState({ board });
                return this.fetchBoardItems();
            }).catch(error => {
                this.setState({ error });
            });
        }
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

    button.fa-expand-arrows-alt {
        bottom: 20px;
        left: 65px;
        opacity: .5;
    }
    button.fa-expand-arrows-alt:hover {
        opacity: .75;
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
    
    button.fa-redo:hover {
        color: #ccc !important;
    }

    .nav-pills .nav-link.active, .nav-pills .show>.nav-link {
        color: #fff;
        background-color: #4e555b;
    }
`;

export default BoardPageStyled;

