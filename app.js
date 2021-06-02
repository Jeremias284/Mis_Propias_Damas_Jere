window.onload = function () {
    //The initial setup
    var gameBoard = [
      [0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [1, 0, 2, 0, 0, 0, 0, 0],
      [0, 1, 0, 2, 0, 2, 0, 0],
      [2, 0, 2, 0, 0, 0, 2, 0]
    ];
    //arrays to store the instances
    var pieces = [];
    var tiles = [];
  
    //distance formula
    var dist = function (x1, y1, x2, y2) {
      return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }
    //Piece object - there are 24 instances of them in a checkers game
    function Piece(element, position) {
   
      //linked DOM element
      this.element = element;
      //positions on gameBoard array in format row, column
      this.position = position;
      //which player's piece i it
      this.player = '';
    }
  
    function Tile(element, position) {
      //linked DOM element
      this.element = element;
      //position in gameboard
      this.position = position;
      //if tile is in range from the piece
      this.inRange = function (piece) {
        for (let k of pieces)
          if (k.position[0] == this.position[0] && k.position[1] == this.position[1]) return 'wrong';
        if (!piece.king && piece.player == 1 && this.position[0] < piece.position[0]) return 'wrong';
        if (!piece.king && piece.player == 2 && this.position[0] > piece.position[0]) return 'wrong';
      };
    }
  
    //Board object - controls logistics of game
    var Board = {
      board: gameBoard,
      tilesElement: $('div.tiles'),
      //dictionary para convertir posiciones en Board.board a las unidades del viewport
      dictionary: ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"],
      //inicializar tabla
      initalize: function () {
        var countPieces = 0;
        var countTiles = 0;
        for (let row in this.board) { //row is the index
          for (let column in this.board[row]) { //column is the index
            //whole set of if statements control where the tiles and pieces should be placed on the board
            if (row % 2 == 1) {
              if (column % 2 == 0) {
                countTiles = this.tileRender(row, column, countTiles)
              }
            } else {
              if (column % 2 == 1) {
                countTiles = this.tileRender(row, column, countTiles)
              }
            }
            if (this.board[row][column] == 1) {
              countPieces = this.playerPiecesRender(1, row, column, countPieces)
            } else if (this.board[row][column] == 2) {
              countPieces = this.playerPiecesRender(2, row, column, countPieces)
            }
          }
        }
      },
      tileRender: function (row, column, countTiles) {
        this.tilesElement.append("<div class='tile' id='tile" + countTiles + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
        tiles[countTiles] = new Tile($("#tile" + countTiles), [parseInt(row), parseInt(column)]);
        return countTiles + 1
      },
  
      playerPiecesRender: function (playerNumber, row, column, countPieces) {
        $(`.player${playerNumber}pieces`).append("<div class='piece' id='" + countPieces + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
        pieces[countPieces] = new Piece($("#" + countPieces), [parseInt(row), parseInt(column)]);
        return countPieces + 1;
      },
      
    }
    //initialize the board
    Board.initalize();
  
  }