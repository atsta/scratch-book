import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import classnames from 'classnames';

export default function BoardRating(props) {

    const rating = (props.ratings || []).reduce((acc, rating, index) => (acc*index+rating)/(index+1), 0);

    return (
        <div className={classnames('d-flex align-items-center', props.className)} title="Board rating">
            <Rating defaultValue={rating} precision={0.5} readOnly />
            <Typography className="ml-1 small text-secondary">({rating})</Typography>
        </div>
    );
};

