import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Header from "./components/elements/Header";
import CryptoEachMethod from "./components/functionUIs/CryptoEachMethod";
import CryptoSameKey from "./components/functionUIs/CryptoSameKey";
import CryptoSameMethod from "./components/functionUIs/CryptoSameMethod";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  appBody: {
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(5),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div>
      <Header></Header>
      <div className={classes.root}>
        <Grid className={classes.appBody} container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <CryptoEachMethod />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <CryptoSameKey />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <CryptoSameMethod />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
