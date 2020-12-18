import React from "react";
import {
  Typography,
  FormControl,
  Input,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DecryptSameKey from "../../algorithms/DecryptSameKey";

import { saveAs, encodeBase64 } from "@progress/kendo-file-saver";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#4b8eeb",
    color: "white",
    borderRadius: "10px",
    width: "100%",
    height: "50px",
  },
  formInput: { marginTop: "50px", width: "80%" },
  chooseMethod: {
    marginTop: theme.spacing(3),
    textAlign: "left",
  },
  input: {
    marginBottom: theme.spacing(3),
  },
  buttonDec: {
    width: "30%",
    marginTop: theme.spacing(2),
    backgroundColor: "#4b8eeb",
    color: "white",
    " & :hover": {
      color: "#4b8eeb",
    },
    margin: "auto",
  },

  body1: {
    color: "#4b8eeb",
  },
  output: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export default function CryptoSameKey(props) {
  const classes = useStyles();

  const [caesarCipher, setCaesarCipher] = React.useState("");
  const [railFenceCipher, setRailFenceCipher] = React.useState("");
  const [combCipher, setCombCipher] = React.useState("");
  const [caesarFile, setCaesarFile] = React.useState("");
  const [railFenceFile, setRailFenceFile] = React.useState("");
  const [combFile, setCombFile] = React.useState("");

  const [output, setOutput] = React.useState("");

  function onFileChange1(e) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;

      setCaesarCipher("");
      setCaesarFile(text);

      console.log("text in file: " + text);
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0]);
    }

    // e.target.value = null; Xoa file
  }

  function onFileChange2(e) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;

      setRailFenceCipher("");
      setRailFenceFile(text);

      console.log("text in file: " + text);
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0]);
    }

    // e.target.value = null; Xoa file
  }

  function onFileChange3(e) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;

      setCombCipher("");
      setCombFile(text);

      console.log("text in file: " + text);
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0]);
    }

    // e.target.value = null; Xoa file
  }

  const handleDecryptSameKey = () => {
    if (
      (!caesarCipher && !caesarFile) ||
      (!railFenceCipher && !railFenceFile) ||
      (!combCipher && !combFile)
    ) {
      alert("Input error");
      return null;
    } else {
      try {
        const result = DecryptSameKey(
          caesarCipher
            ? caesarCipher
            : caesarFile.substring(0, caesarFile.length - 1),
          railFenceCipher
            ? railFenceCipher
            : railFenceFile.substring(0, railFenceFile.length - 1),
          combCipher ? combCipher : combFile.substring(0, combFile.length - 1)
        );
        setOutput(
          "plainText: " + result.plainText + "\n" + "Key: " + result.key
        );
        try {
          const dataURI = "data:text/plain;base64," + encodeBase64(result);
          saveAs(dataURI, "undefined.txt");
        } catch (error) {
          console.log(error);
        }
      } catch (e) {
        alert("Don't exist output!");
      }
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h5">Crypto Same Key</Typography>
      </div>
      <FormControl className={classes.formInput}>
        <div className={classes.input}>
          <Typography variant="body1" align="left" className={classes.body1}>
            Enter Caesar Cipher:{" "}
          </Typography>
          <Input
            style={{ width: "100%" }}
            placeholder="Caesar Cipher"
            onChange={(e) => setCaesarCipher(e.target.value)}
            value={caesarCipher}
          />
          <Input type="file" onChange={onFileChange1} />
        </div>
        <div className={classes.input}>
          <Typography variant="body1" align="left" className={classes.body1}>
            Enter Rail Fence Cipher:{" "}
          </Typography>
          <Input
            style={{ width: "100%" }}
            placeholder="Rail Fence"
            onChange={(e) => setRailFenceCipher(e.target.value)}
            value={railFenceCipher}
          />
          <Input type="file" onChange={onFileChange2} />
        </div>

        <div className={classes.input}>
          <Typography variant="body1" align="left" className={classes.body1}>
            Enter Combination Cipher:{" "}
          </Typography>
          <Input
            style={{ width: "100%" }}
            placeholder="Combination"
            onChange={(e) => setCombCipher(e.target.value)}
            value={combCipher}
          />
          <Input type="file" onChange={onFileChange3} />
        </div>
        <Button
          onClick={handleDecryptSameKey}
          className={classes.buttonDec}
          type="submit"
        >
          Decrypt
        </Button>
        <div className={classes.output}>
          <Typography variant="body1" align="left">
            Decryption output
          </Typography>
          <TextareaAutosize
            style={{ width: "100%", borderRadius: "10px" }}
            id="output"
            rowsMin="4"
            rowsMax="4"
            aria-label="empty textarea"
            readOnly
            value={output}
          />
        </div>
      </FormControl>
    </div>
  );
}
