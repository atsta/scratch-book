import React from 'react';

/**
 *
 */
export default class Faq extends React.Component {

    render() {

        return (
            <div className="pt-5 text-white text-center">
                <div>
                    <h5>What is this?</h5>
                    <p>It is <em>Scratch Book</em> duh...</p>
                </div>
                <div>
                    <h5>Who made this?</h5>
                    <p className="list-unstyled">
                        <span>Αθηνά</span>,
                        {' '}<span>Μιχάλης</span>,
                        {' '}<span>Πέτρος</span>
                    </p>
                </div>
            </div>
        );
    }
};
