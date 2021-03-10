// TODO: Add pagination
// TODO: Prevent malicious js from being input into review box
// TODO: Fix bug where get requests return from server blank (maybe 20% of the time)
// TODO: Fix CSS to be mobile friendly
// TODO: Fix the fact the the image paths are hard-coded into the database

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as Utils from '../utils'
import BoxOne from './components/BoxOne.jsx'
import BoxTwo from './components/BoxTwo.jsx'
import './main.css'

class RottenPotatoes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            sortOrder: 0
        }
    }

    componentDidMount() {
        const networkFailure = () => {
            throw new Error('Error: GET request was not completed')
        }
        const networkSuccess = response => {
            if (!response.ok)
                throw new Error(
                    `Error: HTTP response status ${response.status}`
                )
            else return response.json()
        }

        fetch(`/movies`, {
            method: 'GET'
        })
            .then(networkSuccess, networkFailure)
            .then(data =>
                this.setState({
                    data: data
                })
            )
            .catch(message => console.log(message))
    }

    sortClickHandler() {
        document.querySelectorAll('.content-show').forEach(element => {
            if (element.style.display === 'flex') element.style.display = 'none'
        })

        let sortedData = []
        let newSortOrder = this.state.sortOrder + 1

        if (newSortOrder === 3) {
            this.setState({ sortOrder: 0 })
            newSortOrder = 0
        } else this.setState({ sortOrder: newSortOrder })

        if (newSortOrder === 0) sortedData = Utils.watchSort(this.state.data)
        else if (newSortOrder === 1)
            sortedData = Utils.alphaSort(this.state.data)
        else if (newSortOrder === 2)
            sortedData = Utils.ratingSort(this.state.data)

        this.setState({ data: sortedData })
    }

    movieClickHandler(event) {
        const toggleNode = event.target.nextElementSibling
        toggleNode.style.display === 'none'
            ? (toggleNode.style.display = 'flex')
            : (toggleNode.style.display = 'none')
    }

    submitClickHandler(event) {
        event.preventDefault()
        const watchNumber = parseInt(event.target.id.split('-')[2])
        const author = document.getElementById(`name-input-${watchNumber}`)
            .value
        const body = document.getElementById(`body-input-${watchNumber}`).value
        const date = new Date().toISOString().substring(0, 10)
        const rating = parseFloat(
            document.querySelector(
                `#radio-${watchNumber} input[type=radio]:checked`
            ).value
        )
        // Do not allow reviews without an author or rating (no body is fine)
        if (!author || !rating) return

        const review = {
            author: author,
            date: date,
            body: body,
            rating: rating
        }
        const dataOut = { watch_number: watchNumber, review: review }

        const networkFailure = () => {
            return 'Error: POST request was not completed'
        }
        const networkSuccess = response => {
            if (!response.ok) {
                console.log(`Error: HTTP response status ${response.status}`)
            } else {
                console.log('response was \'ok\'')
            }
        }
        fetch(`/submit/${watchNumber}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataOut)
        })
            .then(networkSuccess, networkFailure)
            .then(() => {
                const updatedIndex = this.state.data.findIndex(element => {
                    return watchNumber === element.watch_number
                })
                const reviewsCurrent = this.state.data[updatedIndex].reviews
                const reviewsUpdated = [...reviewsCurrent, dataOut.review]
                const updatedData = this.state.data
                updatedData[updatedIndex].reviews = reviewsUpdated
                this.setState({ data: updatedData })
            })
            .catch(error => console.log(error))
        document.getElementById(`form-${watchNumber}`).reset()
    }

    render() {
        return (
            <>
                <div id="logo" className="container">
                    <img src="./images/me_face.png" alt="logo" />
                    <h1>Rotten Potatoes</h1>
                    <img src="./images/logo_potato.png" alt="logo" />
                    <p>a quarantine project</p>
                </div>
                <div id="page" className="container">
                    <BoxOne data={this.state.data} />
                    <BoxTwo
                        data={this.state.data}
                        sortClick={() => this.sortClickHandler()}
                        submitClick={() => this.submitClickHandler(event)}
                        movieClick={() => this.movieClickHandler(event)}
                    />
                </div>
                <div id="footer" className="container" />
            </>
        )
    }
}

ReactDOM.render(<RottenPotatoes />, document.getElementById('root'))
