import React from 'react'
import PropTypes from 'prop-types'
import MovieMenu from './MovieMenu.jsx'

function BoxTwo(props) {
    return (
        <div id="box2">
            <div className="h2-box">
                <h2>Movie List</h2>
            </div>
            <div className="description-box">
                <span>
                    The movies are sorted in the order we watched them by
                    default. Click &apos;sort&apos; to also sort alphabetically
                    or by highest rating.
                </span>
            </div>
            <div className="sort-box">
                <button type="button" onClick={props.sortClick}>
                    Sort
                </button>
            </div>
            <div id="movie-menu">
                <MovieMenu data={props.data} movieClick={props.movieClick} submitClick={props.submitClick}/>
            </div>
        </div>
    )
}
BoxTwo.propTypes = {
    data: PropTypes.array.isRequired,
    sortClick: PropTypes.func.isRequired,
    submitClick: PropTypes.func.isRequired,
    movieClick: PropTypes.func.isRequired
}

export default BoxTwo
