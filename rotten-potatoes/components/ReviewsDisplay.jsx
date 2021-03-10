import React from 'react'
import {dateConvert} from '../../utils'
import emptyStar from '../images/stars/star-regular.svg'
import halfStar from '../images/stars/star-half-alt-solid.svg'
import fullStar from '../images/stars/star-solid.svg'

function ReviewsDisplay(props) {
    const starRatings = props.reviews.map((element, index) => (
        <StarRatingsDisplay key={index} starRating={element.rating} />
    ))
    const dates = props.reviews.map(element => dateConvert(element.date))
    const reviewsDisplay = props.reviews.map((element, index) => {
        return (
            <div key={index} className="user-review">
                <div className="reviews-header">
                    <div className="name">
                        Name: &nbsp;<b>{element.author}</b>
                    </div>
                    <div className="rating">{starRatings[index]}</div>
                    <div className="date">Date: &nbsp;{dates[index]}</div>
                </div>
                <p>{element.body}</p>
            </div>
        )
    })
    return reviewsDisplay.reverse()
}

function StarRatingsDisplay(props) {
    const emptyStarImg = new Image(); const halfStarImg = new Image(); const fullStarImg = new Image()
    emptyStarImg.src = emptyStar; halfStarImg.src = halfStar; fullStarImg.src = fullStar
    const full_stars = Math.floor(props.starRating)
    const half_star = Math.ceil(props.starRating - full_stars)
    const empty_stars = 5 - full_stars - half_star
    let starArray = []
    for (let i = 1; i <= full_stars; i++) {
        starArray.push(<img key={i} src={fullStarImg.src} />)
    }
    if (half_star) starArray.push(<img key={5} src={halfStarImg.src} />)
    for (let j = 1; j <= empty_stars; j++) {
        starArray.push(<img key={j + 5} src={emptyStarImg.src} />)
    }
    return starArray
}

export default ReviewsDisplay
