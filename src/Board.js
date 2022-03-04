// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    // I - rowIndex
    // O - boolean
    hasRowConflictAt: function(rowIndex) {
      // access the Board array with rows()
      let targetRow = this.rows()[rowIndex];
      let counter = 0;

      // iterate through the row, specified by rowIndex and check for 1's
      for (const elem of targetRow) {
        if (elem === 1) {
          counter++;
        }
      }

      if (counter >= 2) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts

    // I - none
    // O - boolean true/false

    // checks entire board and returns if any row conflicts

    hasAnyRowConflicts: function() {
      // alias board
      let board = this.rows();

      // To Do Later:
      // board.forEach((row, i) => (hasRowConflictAt(i)) ? true : false);

      // iterate over the board
      for (let i = 0; i < board.length; i++) {
        // if return of (call hasRowConflictAt(current index)) return true
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    // I - index number (index within each row array)
    // O - boolean true/false

    hasColConflictAt: function(colIndex) {
      // alias board
      let board = this.rows();
      // counter
      let counter = 0;

      // iterate through the board (i = row array)
      // iterate through each row array (j = column index)
      // check if item at current column index === 1
      // if current column not equal to colum index, continue
      // if so, counter ++
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (j !== colIndex) {
            continue;
          }
          if (board[i][j] === 1) {
            counter++;
          }
        }
      }

      // if counter >= 2, return true
      if (counter >= 2) {
        return true;
      }
      // return false
      return false;
    },

    // test if any columns on this board contain conflicts

    // I - none
    // O - boolean true/false

    hasAnyColConflicts: function() {
      // alias board
      var firstRow = this.rows()[0];
      if (!firstRow) {
        return false;
      }

      // iterate through first row
      // if (hasColConflictAt(index)), return true
      for (let i = 0; i < firstRow.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    // I - starting column index for this major diagonal (trace major diagonal to first row) (can be negative index)
    //     iteration starts at (rowIndex, columnIndex) = (0, majorDiagonalColumnIndexAtFirstRow)

    // O - boolean true/false

    // E - if a negative index is passed, find diagonal's starting row index in first column (trace major diagonal to first column)

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // alias board
      let context = this;
      let board = this.rows();
      // declare counter
      let counter = 0;

      // alias targetRowIndex starting point
      let targetRowIndex = 0;
      // alias targetColIndex starting point
      let targetColIndex = majorDiagonalColumnIndexAtFirstRow;

      // find board entry point, based on passed in column value
      while (!context._isInBounds(targetRowIndex, targetColIndex)) {
        targetRowIndex++;
        targetColIndex++;
      }

      // declare a recursive innerFunction(targetRowIndex, targetColIndex)
      const checkMajorDiagonalEntry = function(rowIndex, colIndex) {
        //// base case: we have left the array behind
        if (!context._isInBounds(rowIndex, colIndex)) {
          return;
        }

        if (board[rowIndex][colIndex] === 1) {
          counter++;
        }

        checkMajorDiagonalEntry(rowIndex + 1, colIndex + 1);
      };

      // use starting points to FIRST invoke innerFunction(targetRowIndex, targetColIndex)
      checkMajorDiagonalEntry(targetRowIndex, targetColIndex);

      // if counter >= 2, return true
      // else return false
      if (counter >= 2) {
        return true;
      } else {
        return false;
      }
    },



    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let n = this.get('n');

      // iterate through every major diagonal on the board
      // if given this starting point there is a hasMajorDiagonalConflictAt return true
      for (let i = -n + 1; i < n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // alias board
      let context = this;
      let board = this.rows();
      // declare counter
      let counter = 0;

      // alias targetRowIndex starting point
      let targetRowIndex = 0;
      // alias targetColIndex starting point
      let targetColIndex = minorDiagonalColumnIndexAtFirstRow;

      // find board entry point, based on passed in column value
      while (!context._isInBounds(targetRowIndex, targetColIndex)) {
        targetRowIndex++;
        targetColIndex--;
      }

      // declare a recursive innerFunction(targetRowIndex, targetColIndex)
      const checkMinorDiagonalEntry = function(rowIndex, colIndex) {
        //// base case: we have left the array behind
        if (!context._isInBounds(rowIndex, colIndex)) {
          return;
        }

        if (board[rowIndex][colIndex] === 1) {
          counter++;
        }

        checkMinorDiagonalEntry(rowIndex + 1, colIndex - 1);
      };

      // use starting points to FIRST invoke innerFunction(targetRowIndex, targetColIndex)
      checkMinorDiagonalEntry(targetRowIndex, targetColIndex);

      // if counter >= 2, return true
      // else return false
      if (counter >= 2) {
        return true;
      } else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let n = this.get('n');

      // iterate through every minor diagonal on the board
      // if given this starting point there is a hasMajorDiagonalConflictAt return true
      for (let i = 2 * (n - 1); i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
