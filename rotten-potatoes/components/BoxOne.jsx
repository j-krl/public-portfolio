import React from 'react'
import PropTypes from 'prop-types'
import {ratingSort} from '../../utils'

function BoxOne(props) {
    return (
        <div id="box1">
            <h2>Welcome to Rotten Potatoes.</h2>
            <img src="./images/potato.png" alt="Big Potato" />
            <div className="entry">
                <p>
                    This website was both a project to develop some Javascript
                    skills as well as to document something fun we did during
                    quarantine 2020. Starting around the end of March, my family
                    and I watched a different movie every single night up until
                    the list ends. I wrote this website to document the movies
                    we watched. I wanted to aggregate everyone&apos;s ratings of
                    the films to determine what our favourite movie was overall.
                </p>
                <br />
                <p>
                    I wrote this website basically from scratch (I used a basic
                    CSS template I found online). The front-end is written in
                    HTML, CSS, and Javascript. I wrote the server in Express for
                    Node.js and used MongoDB for the database. Hope you enjoy!
                </p>
                <br />
                <p>
                    Movies with the higher average rating are ranked higher. In
                    the event of a tie, the movie with more reviews is ranked
                    higher.
                </p>
            </div>
            <br />
            <br />
            <div className="h3-box">
                <h3>Overall Rankings</h3>
            </div>
            <ol className="rankings">
                <RankingsList data={props.data} />
            </ol>
        </div>
    )
}
BoxOne.propTypes = {
    data: PropTypes.array.isRequired
}

function RankingsList(props) {
    const data = props.data
    const sortedData = ratingSort(data)
    const rankings = sortedData.map(movie => {
        const num =
            movie.reviews.reduce((acc, val) => acc + val.rating, 0) /
            movie.reviews.length
        return Math.round(num * 100) / 100
    })
    const rankingsList = sortedData.map((movie, index) => {
        return (
            <React.Fragment key={index}>
                <li>
                    <span className="title">{movie.title}</span>
                    <span className="rank">
                        <b>{rankings[index]}</b>
                    </span>
                </li>
            </React.Fragment>
        )
    })
    return rankingsList
}

export default BoxOne
