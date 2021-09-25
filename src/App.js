import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

// import ButtonAppBar from "./component/navbar/navbar";

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(1),
    fontSize: 40,
    width: 100,
    height: 100,
    // color:
  },
  x: {
    color: "green",
  },
  o: { color: "yellow" },
  currentPlayer: {
    pointerEvents: "none",
    marginTop: 20,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  let tab = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [tableau, setTableau] = useState(tab);
  const [winner, setWinner] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("X");

  // useEffect(() => {
  //   console.log("effect");
  //   console.log(tableau);
  //   console.log("effect");
  // }, [tableau]);

  function test(tableau) {
    for (var i = 0; i < 3; i++) {
      if (
        tableau[i][1] === tableau[i][2] &&
        tableau[i][0] === tableau[i][1] &&
        tableau[i][1] !== ""
      ) {
        return true;
      }
    }
    for (i = 0; i < 3; i++) {
      if (
        tableau[1][i] === tableau[2][i] &&
        tableau[0][i] === tableau[1][i] &&
        tableau[1][i] !== ""
      ) {
        return true;
      }
    }
    if (
      (tableau[1][1] === tableau[2][2] &&
        tableau[0][0] === tableau[1][1] &&
        tableau[1][1] !== "") ||
      (tableau[1][3] === tableau[2][2] &&
        tableau[3][1] === tableau[2][2] &&
        tableau[2][2] !== "")
    ) {
      return true;
    }
    return false;
  }

  const playerclick = (i, j) => {
    // console.log(i, j);
    // setTableau
    if (tableau[i][j] === "" && winner === "") {
      let table = [...tableau];
      table[i][j] = currentPlayer;
      setTableau([...table]);
      if (test(table)) {
        setWinner(currentPlayer + " WIN");
        return false;
      }
      if (currentPlayer === "X") {
        setCurrentPlayer("O");
      } else {
        setCurrentPlayer("X");
      }
    }
  };
  const data = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
  ];

  const classes = useStyles();
  return (
    <div className="App-header">
      {winner}
      {tableau.map((line, key) => (
        <div key={key}>
          {line.map((value, k) => (
            <Button
              key={k}
              onClick={() => {
                playerclick(key, k);
              }}
              className={
                classes.btn + " " + (value === "X" ? classes.x : classes.o)
              }
              size="large"
              variant="outlined"
              color="primary"
            >
              {value}
            </Button>
          ))}
        </div>
      ))}
      <Button
        className={classes.currentPlayer}
        variant="outlined"
        color="secondary"
      >
        Current player : {currentPlayer}
      </Button>
      <br />
      {winner === "" ? (
        ""
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setTableau(tab);
            setWinner("");
          }}
        >
          Play Again
        </Button>
      )}
    </div>
  );
}

export default App;
