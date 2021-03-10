// BUG: Rendering glitch:
// There's some kind of weird glitch where the board occasionally will not re-render
// occasionally. If the browser window is re-sized the updates will be shown. I suppose this
// means it is being re-rendered in the React DOM but for some reason not being immediately
// shown.

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Spring } from 'react-spring/renderprops'
import Connect4Game from './Connect4Game'

//------------------------------------------------------------------------------
// Board GUI
//------------------------------------------------------------------------------

function AnimateChecker(yPos, colour) {
    return (
        <Spring from={{ number: 0 }} to={{ number: 50 + 100 * yPos }}>
            {props => <circle cx="50" cy={props.number} r="40" fill={colour} />}
        </Spring>
    )
}
AnimateChecker.propTypes = {
    number: PropTypes.number.isRequired
}

function Checker(props) {
    return props.colour ? AnimateChecker(props.row, props.colour) : null
}

function CheckerColumn(props) {
    const colour = ['red', 'yellow']
    // column elements that are 0 will not map to an element from 'colour' and so // will return null in the Checker function
    const gameCol = props.gameCol
    return gameCol.map((element, index) => {
        return <Checker key={index} colour={colour[element - 1]} row={index} />
    })
}

function Defs() {
    return (
        <defs>
            <pattern
                id="cell-pattern"
                patternUnits="userSpaceOnUse"
                width="100"
                height="100">
                <circle cx="50" cy="50" r="40" fill="black" />
            </pattern>
            <mask id="cell-mask">
                <rect width="100" height="600" fill="white"></rect>
                <rect width="100" height="600" fill="url(#cell-pattern)"></rect>
            </mask>
        </defs>
    )
}

function Rectangle() {
    return (
        <rect
            width="100"
            height="600"
            fill={'#1887ff'}
            mask="url(#cell-mask)"></rect>
    )
}

function FinalColumn(props) {
    return (
        <svg x={props.num * 100} y="0" onClick={props.colUpdate}>
            <CheckerColumn gameCol={props.gameCol} />
            <Rectangle />
        </svg>
    )
}
FinalColumn.propTypes = {
    colUpdate: PropTypes.func.isRequired,
    gameCol: PropTypes.array.isRequired,
    num: PropTypes.number.isRequired
}

//------------------------------------------------------------------------------
// Final App
//------------------------------------------------------------------------------

function Conn4GUI() {
    const game = new Connect4Game()
    const [gameState, setGameState] = useState(game)
    function colClick(colNum) {
        const newGame = new Connect4Game()
        newGame.setBoard(gameState)
        newGame.play(colNum)
        setGameState(newGame)
    }

    const blankArray = [null, null, null, null, null, null, null]
    const columnsArray = blankArray.map((e, index) => {
        return (
            <FinalColumn
                key={index}
                num={index}
                gameCol={gameState.column(index)}
                colUpdate={() => colClick(index)}
            />
        )
    })

    // TODO: Turn this into a returned array to cut down on repeated logic
    return (
        <div className="gameBox">
            <svg className="rounded" viewBox="0 0 700 600">
                <Defs />
                {columnsArray}
            </svg>
        </div>
    )
}

ReactDOM.render(<Conn4GUI />, document.getElementById('root'))
