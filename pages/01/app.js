document.addEventListener("DOMContentLoaded", () => {
  const scoreDisplay = document.getElementById("score");
  const grid = document.querySelector(".grid");
  const width = 8;
  const squares = [];
  let score = 0;

  const candyColor = [
    "#ff595e",
    "#ffca3a",
    "#8ac926",
    "#1982c4",
    "#6a4c93",
  ];

  // Create Board  8*8 = 64  width = 8
  function createdBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);      
      let randomColor = Math.floor(Math.random() * candyColor.length);
      square.style.backgroundColor = candyColor[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createdBoard();

  //Dragging the candies
  let colorBeingDraggad;
  let colorBeingReplace;
  let squareIdBeingDraggad;
  let squareIdBeingReplace;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenterr", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDraggad = this.style.backgroundColor;
    squareIdBeingDraggad = parseInt(this.id);
  }
  function dragOver(e) {
    e.preventDefault();
  }
  function dragEnter(e) {
    e.preventDefault();
  }
  function dragLeave() {}

  function dragDrop() {
    colorBeingReplace = this.style.backgroundColor;
    squareIdBeingReplace = parseInt(this.id);
    squares[squareIdBeingDraggad].style.backgroundColor = colorBeingReplace;
    squares[squareIdBeingReplace].style.backgroundColor = colorBeingDraggad;
  }
  function dragEnd() {
    // What is a valid move?  
    let validMoves = [
      squareIdBeingDraggad - 1, // previous square
      squareIdBeingDraggad - width, // square above
      squareIdBeingDraggad + 1, // square above
      squareIdBeingDraggad + width, // square below
    ];
    
    let validMove = validMoves.includes(squareIdBeingReplace);

    if (squareIdBeingReplace && validMove) {
      squareIdBeingReplace = null;
    } else if (squareIdBeingReplace && !validMove) {
      squares[squareIdBeingReplace].style.backgroundColor = colorBeingReplace;
      squares[squareIdBeingDraggad].style.backgroundColor = colorBeingDraggad;
    } else
      squares[squareIdBeingDraggad].style.backgroundColor = colorBeingDraggad;
  }

  // Drop candies once some have cleared
  function moveDown() {
    for (let i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundColor === "") {
        squares[i + width].style.backgroundColor =
          squares[i].style.backgroundColor;
        squares[i].style.backgroundColor = "";
        const firstRpw = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRpw.includes(i);
        if (isFirstRow && squares[i].style.backgroundColor === "") {
          let randomColor = Math.floor(Math.random() * candyColor.length);
          squares[i].style.backgroundColor = candyColor[randomColor];
        }
      }
    }
  }

  // Checking for maches
  // row of Three
  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlanck = squares[i].style.backgroundColor === "";
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlanck
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
      }
    }
  }
  //checkRowForThree();

  // column of Three
  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlanck = squares[i].style.backgroundColor === "";
      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlanck
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;

        columnOfThree.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
      }
    }
  }
  //checkColumnForThree();

  // row of Four
  function checkRowForFour() {
    for (let i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlanck = squares[i].style.backgroundColor === "";
      const notValid = [
        5,
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
      ];
      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlanck
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
      }
    }
  }
  //checkRowForFour();

  // column of Four
  function checkColumnForFour() {
    for (let i = 0; i < 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, width * 3];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlanck = squares[i].style.backgroundColor === "";
      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlanck
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;

        columnOfFour.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
      }
    }
  }


  window.setInterval(function () {
    // moveDown();
    // checkColumnForFour();
    // checkRowForFour();
    // checkColumnForThree();
    // checkRowForThree();
  }, 100);
});
