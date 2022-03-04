/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// I - n = dimension of chess board
// O - single solution array of arrays (board) (naive solution?)

// start with a rook at (0,0) (togglePiece)
// iterate through every position on the board, add a piece, and check for board conflicts
// if there is a conflict, remove the piece



window.findNRooksSolution = function(n) {
  let newBoard = new Board({'n': n});
  let solution = newBoard.rows();

  // toggle first piece
  newBoard.togglePiece(0, 0);

  // iterate through solution
  for (let i = 0; i < solution.length; i++) {
    for (let j = 0; j < solution[i].length; j++) {
      // skip first position
      if (i === 0 && j === 0) {
        continue;
      }
      // toggle piece
      newBoard.togglePiece(i, j);

      // check board for conflicts
      if (newBoard.hasAnyRooksConflicts()) {
        // remove piece
        newBoard.togglePiece(i, j);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // create new board instance
  let newBoard = new Board({'n': n});
  // edge case for n = 0
  if (n === 0) {
    return newBoard.rows();
  }

  // create an inner function that takes current row as input
  const placeQueens = function(rowIndex) {
    // create alias to be more clear and concise
    let currentRow = newBoard.rows()[rowIndex];
    // if rowIndex is undefined, just return
    if (currentRow === undefined) {
      return;
    }

    // console.log('currentRow: -> ', currentRow);

    // for loop, traversing each column in given row
    for (let j = 0; j < currentRow.length; j++) {
      // toggle queen in position
      newBoard.togglePiece(rowIndex, j);
      // if no conflicts
      if (!newBoard.hasAnyQueensConflicts()) {
        // recursively call placeQueens(rowIndex +1)
        placeQueens(rowIndex + 1);
      }

      if (newBoard.hasAnyQueensConflicts()) {
        newBoard.togglePiece(rowIndex, j);
      }
      // // untoggle queen
      // newBoard.togglePiece(rowIndex, currentRow[j]);
    }

    // if we reach the end of the row without opening recursive branch
    return;
  };

  // call inner function at row = 0 to start the recursive tree
  placeQueens(0);

  // return board's rows
  return newBoard.rows();








  // let newBoard = new Board({'n': n});
  // let solution = newBoard.rows();
  // let queens = 0;

  // // edge case n = 0
  // if (n === 0) {
  //   return solution;
  // }

  // // for recursive use
  // let firstColIndex = arg1 || 0;

  // // toggle first piece
  // newBoard.togglePiece(0, firstColIndex);
  // queens++;

  // // iterate through entire board
  // for (let i = 0; i < solution.length; i++) {
  //   for (let j = 0; j < solution[i].length; j++) {

  //     // skip un-toggling first piece
  //     if (i === 0 && j === firstColIndex) {
  //       continue;
  //     }

  //     // toggle queen on
  //     newBoard.togglePiece(i, j);
  //     queens++;

  //     // check if any conflicts on board
  //     if (newBoard.hasAnyQueensConflicts()) {
  //       // toggle queen off
  //       newBoard.togglePiece(i, j);
  //       queens--;
  //     }
  //   }
  // }

  // // if not enough queens in solution, run again with new starting piece
  // if (queens === n) {
  //   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //   return solution;
  // } else {
  //   solution = findNQueensSolution(n, firstColIndex + 1);
  // }

  // return solution;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
