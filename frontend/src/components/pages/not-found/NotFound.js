import React from 'react';

/**
 *
 */
export default class NotFound extends React.Component {

    render() {

        return (
            <div className="pt-5 text-white text-center">
                Page <code className="font-weight-bold">{this.props.location.pathname}</code> not found ¯\_(ツ)_/¯
            </div>
        );
    }
};
