// 1 for red, 2 for yellow
// (0,0) is the top left of the board
function Connect4Game() {

  // GLOBALS
  let redNext = true // true if red is next to play
  let board = new Array(6).fill(0).map(() => new Array(7).fill(0))
  let history = [] // array of board states
  let result = 0 // 0 = in progress, 1 = red win, 2 = yellow win, 3 = draw

  // METHODS
  this.board = () => board
  this.redNext = () => redNext
  this.history = () => history
  this.result = () => result
  this.setBoard = (newGameObj) => {
    if (newGameObj.redNext() === undefined)
      throw new Error("must specify next player to play in setBoard argument")
    if (!Array.isArray(newGameObj.board()) || newGameObj.board().length !== 6)
      throw new Error("setBoard 'board' argument is not a 6x7 array")
    for (let n = 0; n < 6; n++) {
      if (!Array.isArray(newGameObj.board()[n]) || newGameObj.board()[n].length !== 7) {
        throw new Error("setBoard 'board' argument is not a 6x7 array")
      }
    } // could add one more error for illegal board layouts but it sounds like a lot of work :/
    board = JSON.parse(JSON.stringify(newGameObj.board()))
    redNext = JSON.parse(JSON.stringify(newGameObj.redNext()))
    history = JSON.parse(JSON.stringify(newGameObj.history()))
    result = JSON.parse(JSON.stringify(newGameObj.result()))
    return board
  }
  this.undo = () => {
    history.pop()
    board = history.slice(-1)[0].board
    redNext = redNext ? false : true
  }
  this.column = colNum => {
    let array = []
    for (let i = 0; i < 6; i++) array.push(board[i][colNum])
    return array
  }
  this.play = col => {
    const colour = redNext ? 1 : 2
    if (result) return false // disallow moves if game is over
    for (let i = 5; i >= 0; i--) {
      if (!board[i][col]) {
        board[i][col] = colour
        history.push(board)
        redNext = redNext ? false : true
        const gameOver = this.gameOver(i, col, board, colour)
        if (gameOver) {
          result = gameOver
          return gameOver
        }
        return true
      }
    }
    return false // not a legal move--no empty circle in the column
  }
  this.gameOver = (focalRow, focalCol, board, colour) => {
    const horizWin = () => {
      const minCol = focalCol < 3 ? 0 : focalCol - 3
      const maxCol = focalCol > 3 ? 6 : focalCol + 3
      for (let col = minCol, x = 1; col <= maxCol; col++, x++) {
        if (board[focalRow][col] !== colour) x = 0
        if (x === 4) return colour
      }
      return false
    }
    const vertWin = () => {
      const minRow = focalRow < 3 ? 0 : focalRow - 3
      const maxRow = focalRow > 2 ? 5 : focalRow + 3
      for (let row = minRow, x = 1; row <= maxRow; row++, x++) {
        if (board[row][focalCol] !== colour) x = 0
        if (x === 4) return colour
      }
      return false
    }
    const slashWin = () => {
      let row = focalRow
      let col = focalCol
      let x = 0
      while (row < 5 && col > 0) {
        row++
        col--
      }
      while (row >= 0 && col < 7) {
        x++
        if (board[row][col] !== colour) x = 0
        if (x === 4) return colour
        row--
        col++
      }
      return false
    }
    const backslashWin = () => {
      let row = focalRow
      let col = focalCol
      let x = 0
      while (row > 0 && col > 0) {
        row--
        col--
      }
      while (row < 6 && col < 7) {
        x++
        if (board[row][col] !== colour) x = 0
        if (x === 4) return colour
        row++
        col++
      }
      return false
    }
    if (this.history.length === 42) return 3
    return [horizWin(), vertWin(), slashWin(), backslashWin()].find(
      element => element
    )
  }
}

export default Connect4Game
