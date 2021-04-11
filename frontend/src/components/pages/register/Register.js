import React from 'react';
import { createUser } from '../../../api';

/**
 *
 */
export default class Register extends React.Component {

    onSubmit(event) {

        event.preventDefault();
        // event.stopPropagation();
        // event.stopImmediatePropagation();

        const formData = new FormData(event.target);
        formData.delete('retype-password');

        createUser(formData)
            .catch(console.warn);
    }

    render() {

        return (
            <div className="pt-5 text-white text-center">
                REGISTRATION FORM
                <hr />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>
                            Name:
                            <input type="text" name="name" className="form-control" placeholder="Enter name"
                                minLength={6} required={true} defaultValue={123123} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Email address:
                            <input type="email" name="email" className="form-control"
                                placeholder="Enter email address" required={true} defaultValue="pp@dom.org" />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Password:
                            <input type="password" name="password"  className="form-control" autoComplete="new-password"
                                placeholder="Enter password" required={true} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Retype password:
                            <input type="password" name="retype-password"  className="form-control"
                                autoComplete="new-password" placeholder="Please re-type the password" />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        );
    }
};
