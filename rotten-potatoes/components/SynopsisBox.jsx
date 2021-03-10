import React from 'react'
import PropTypes from 'prop-types'

function SynopsisBox(props) {
    return (
        <div className="synopsis-box">
            <img src={props.poster} />
            <div className="synopsis-writeup">
                <h3>Synopsis</h3>
                <p>{props.synopsis}</p>
            </div>
        </div>
    )
}
SynopsisBox.propTypes = {
    poster: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired
}

export default SynopsisBox