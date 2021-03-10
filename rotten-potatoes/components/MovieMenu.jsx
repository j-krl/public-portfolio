import React from 'react'
import SynopsisBox from './SynopsisBox.jsx'
import ReviewsBox from './ReviewsBox.jsx'

function MovieMenu(props) {
    const movieMenu = props.data.map((element, index) => {
        return (
            <React.Fragment key={index}>
                <button
                    key={element.watch_number}
                    id={`button-${element.watch_number}`}
                    className="movie-button"
                    type="button"
                    onClick={props.movieClick}>
                    <span>
                        <b>{element.title}</b>
                    </span>
                </button>
                <div className="content-show" style={{display: 'none'}}>
                    <SynopsisBox
                        poster={element.poster}
                        synopsis={element.synopsis}
                    />
                    <br />
                    <ReviewsBox
                        watchNumber={element.watch_number}
                        reviews={element.reviews}
                        submitClick={props.submitClick}
                    />
                </div>
            </React.Fragment>
        )
    })
    return movieMenu
}

export default MovieMenu