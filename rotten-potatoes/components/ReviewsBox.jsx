import React from 'react'
import PropTypes from 'prop-types'
import ReviewsDisplay from './ReviewsDisplay.jsx'
import ReviewsInput from './ReviewsInput.jsx'

function ReviewsBox(props) {
    return (
        <div id={`reviews-box-${props.watchNumber}`} className="reviews-box">
            <div className="reviews-title">
                <h3>Reviews</h3>
            </div>
            <div
                id={`reviews-display-${props.watchNumber}`}
                className="reviews-display">
                <ReviewsDisplay
                    watchNumber={props.watchNumber}
                    reviews={props.reviews}
                />
            </div>
            <div
                id={`reviews-input-${props.watchNumber}`}
                className="reviews-input">
                <ReviewsInput watchNumber={props.watchNumber} submitClick={props.submitClick} />
            </div>
        </div>
    )
}
ReviewsBox.propTypes = {
    watchNumber: PropTypes.number.isRequired,
    reviews: PropTypes.array.isRequired,
    submitClick: PropTypes.func.isRequired
}

export default ReviewsBox
