import React from 'react'
import PropTypes from 'prop-types'

function ReviewsInput(props) {
    return (
        <fieldset>
            <form id={`form-${props.watchNumber}`}>
                <label htmlFor={`name-input-${props.watchNumber}`}>
                    Name:{' '}
                </label>
                <input
                    id={`name-input-${props.watchNumber}`}
                    className="name-input"
                    type="text"
                />
                <label htmlFor={`rating-input-${props.watchNumber}`}>
                    Rating:{' '}
                </label>
                <div id={`radio-${props.watchNumber}`} className="radio">
                    <StarRatingInputs watchNumber={props.watchNumber} />
                </div>
                <label htmlFor={`body-input-${props.watchNumber}`}>
                    Review:{' '}
                </label>
                <textarea
                    id={`body-input-${props.watchNumber}`}
                    className="body-input"
                />
                <input
                    id={`submit-button-${props.watchNumber}`}
                    className="submit-button"
                    value="Submit"
                    type="submit"
                    onClick={props.submitClick}
                />
            </form>
        </fieldset>
    )
}
ReviewsInput.propTypes = {
    watchNumber: PropTypes.number.isRequired,
    submitClick: PropTypes.func.isRequired
}

function StarRatingInputs(props) {
    let radioInputsArray = []
    for (let i = 10; i >= 1; i--) {
        radioInputsArray.push(
            <React.Fragment key={i}>
                <input
                    id={`star${i / 2}-${props.watchNumber}`}
                    name={`rating-input-${props.watchNumber}`}
                    value={i / 2}
                    type="radio"
                />
                <label
                    className={i % 2 ? 'half' : 'full'}
                    htmlFor={`star${i / 2}-${props.watchNumber}`}
                    title={`${i / 2} stars`}
                />
            </React.Fragment>
        )
    }
    return radioInputsArray
}

export default ReviewsInput