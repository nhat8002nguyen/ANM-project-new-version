import React from "react";
import {
  Typography,
  FormControl,
  Input,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DecryptSameMethod from "../../algorithms/DecryptSameMethod";
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
  inputArea: {
    width: "100%",
    borderRadius: "10px",
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
    position: "relative",
    bottom: "70px",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(-6),
  },
}));

export default function CryptoSameKey(props) {
  const classes = useStyles();

  const [cipher, setCipher] = React.useState("");
  const [ciphers, setCiphers] = React.useState([]);

  const [outputs, setOutputs] = React.useState([]);
  const [method, setMethod] = React.useState("");
  const handleChangeMethod = (event) => {
    setMethod(event.target.value);
  };

  const addCipher = () => {
    if (cipher) {
      setCiphers((prevArr) => {
        return [...prevArr, cipher];
      });
      setCipher("");
    }
  };

  const handleDecryptSameMethod = () => {
    if (ciphers.length <= 1) {
      alert("missing input!");
      return null;
    } else {
      const result = DecryptSameMethod(method, ciphers);
      setOutputs(result);
      setCiphers([]);

      if (result[0].plainText.length >= 100) {
        try {
          const outputFile = result.map(
            (output) =>
              "key: " +
              output.keys +
              "\n" +
              "plaintext: " +
              output.plainText +
              "\n"
          );
          const dataURI =
            "data:text/plain;base64," + encodeBase64(outputFile.join("\n"));
          saveAs(dataURI, "undefined.txt");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const cipher = e.target.result;

      if (cipher) {
        setCiphers((prevArr) => {
          return [...prevArr, cipher];
        });
        setCipher("");
      }

      console.log("text in file: " + cipher);
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0]);
    }

    // e.target.value = null; Xoa file
  };

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h5">Crypto Same Method</Typography>
      </div>
      <FormControl className={classes.formInput}>
        <div className={classes.input}>
          <Typography variant="body1" align="left" className={classes.body1}>
            Enter Cipher:{" "}
          </Typography>
          <Input
            value={cipher}
            style={{ width: "100%" }}
            placeholder="Cipher Text"
            onChange={(e) => setCipher(e.target.value)}
          />

          <Input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <Button
            onClick={addCipher}
            className={classes.buttonDec}
            style={{ marginTop: "0px" }}
            type="submit"
          >
            Add
          </Button>
          <Typography
            style={{ marginTop: "20px " }}
            variant="body1"
            align="left"
          >
            Array of inputs
          </Typography>

          <TextareaAutosize
            className={classes.inputArea}
            id="output"
            rowsMin="3"
            rowsMax="3"
            aria-label="empty textarea"
            readOnly
            value={ciphers.map((cipher) => cipher + "\n")}
          />
        </div>

        <div className={classes.chooseMethod}>
          <FormLabel component="legend" className={classes.body1}>
            Crypto Method
          </FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={method}
            onChange={handleChangeMethod}
          >
            <FormControlLabel
              value="Caesar Cipher"
              control={<Radio />}
              label="Caesar Cipher"
            />
            <FormControlLabel
              value="Rail Fence"
              control={<Radio />}
              label="Rail Fence"
            />
            <FormControlLabel
              style={{ position: "relative", bottom: "85px", left: "200px" }}
              value="Combination"
              control={<Radio />}
              label="Combination"
            />
          </RadioGroup>
        </div>
        <div className={classes.output}>
          <Button
            onClick={handleDecryptSameMethod}
            className={classes.buttonDec}
            type="submit"
          >
            Decrypt
          </Button>

          <Typography variant="body1" align="left">
            Decryption output
          </Typography>
          <TextareaAutosize
            className={classes.inputArea}
            style={{ marginTop: "0%" }}
            id="output"
            rowsMin="4"
            rowsMax="4"
            aria-label="empty textarea"
            readOnly
            value={outputs.map(
              (output) =>
                "key: " +
                output.keys +
                "\n" +
                "plaintext: " +
                output.plainText +
                "\n"
            )}
          />
        </div>
      </FormControl>
    </div>
  );
}
