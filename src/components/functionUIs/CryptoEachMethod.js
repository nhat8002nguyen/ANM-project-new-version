import React from "react";
import {
  Typography,
  FormControl,
  Input,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Encrypt from "../../algorithms/Encrypt";
import Decrypt from "../../algorithms/Decrypt";
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
  buttonEnc: {
    width: "30%",
    marginTop: theme.spacing(2),
    backgroundColor: "#4b8eeb",
    color: "white",
    " & :hover": {
      color: "#4b8eeb",
    },
  },
  buttonDec: {
    width: "30%",
    marginTop: theme.spacing(2),
    backgroundColor: "#4b8eeb",
    color: "white",
    " & :hover": {
      color: "#4b8eeb",
    },
    position: "relative",
    bottom: theme.spacing(6),
    left: theme.spacing(25),
  },
  output: {
    position: "relative",
    bottom: theme.spacing(3),
  },
  body1: {
    color: "#4b8eeb",
  },
}));

export default function CryptoEachMethod(props) {
  const classes = useStyles();

  const [content, setContent] = React.useState("");
  const [fileContent, setFileContent] = React.useState("");
  const [method, setMethod] = React.useState("Caesar Cipher");
  const [key, setKey] = React.useState("");
  const [outputTitle, setOutputTitle] = React.useState("Output");
  const [output, setOutput] = React.useState("");

  const handleChangeMethod = (event) => {
    setMethod(event.target.value);
  };

  const onKeyChange = (e) => {
    const key = e.target.value;
    if (key.length > 0) {
      if (
        parseInt(key).toString() !== key ||
        parseInt(key) < 0 ||
        parseInt(key) > 25
      ) {
        alert("Key error");
        return null;
      } else if (method === "Caesar Cipher") {
        if (parseInt(key) < 0 || parseInt(key) > 25) {
          alert("Key error");
          return null;
        }
      } else if (method === "Rail Fence" || method === "Combination") {
        if (parseInt(key) < 2 || parseInt(key) > 7) {
          alert("Key error");
          return null;
        }
      }
      setKey(parseInt(key));
    } else {
      setKey(key);
    }
  };

  function onFileChange(e) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;

      setContent("");
      setFileContent(text);

      console.log("text in file: " + text);
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0]);
    }

    // e.target.value = null; Xoa file
  }

  function handleEncrypt(e) {
    if (!fileContent) {
      try {
        setOutputTitle("ENCRYPTION OUTPUT");
        setOutput(Encrypt(method, key, content));
      } catch (error) {
        if (!method || !content.length === 0)
          alert("Something wrong!. Are you miss method or key or input.");
        console.log(error);
      }
    } else {
      try {
        const result = Encrypt(method, key, fileContent);

        const dataURI = "data:text/plain;base64," + encodeBase64(result);
        saveAs(dataURI, "undefined.txt");
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleDecrypt(e) {
    if (!fileContent) {
      try {
        setOutputTitle("DECRYPTION OUTPUT");
        setOutput(Decrypt(method, key, content));
      } catch (e) {
        alert(e);
      }
    } else {
      try {
        const decResult = Decrypt(method, key, fileContent);

        const dataURI = "data:text/plain;base64," + encodeBase64(decResult);
        saveAs(dataURI, "undefined.txt");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h5">Crypto Each Method</Typography>
      </div>
      <FormControl className={classes.formInput}>
        <Typography variant="body1" align="left" className={classes.body1}>
          Enter Input:{" "}
        </Typography>
        <Input
          onChange={(e) => {
            setContent(e.target.value);
            setFileContent(null);
          }}
          placeholder="PlainText or cipherText"
          value={content}
        />

        <Input type="file" onChange={onFileChange} />
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
              value="Combination"
              control={<Radio />}
              label="Combination"
            />
          </RadioGroup>
        </div>

        <Typography variant="body1" align="left" className={classes.body1}>
          Enter key:{" "}
        </Typography>
        <Input
          value={key}
          onChange={onKeyChange}
          aria-describedby="my-helper-key"
        />
        <FormHelperText id="my-helper-key">
          {method === "Caesar Cipher" ? "Key 0-25" : "Key 2-7"}
        </FormHelperText>
        <Button
          onClick={handleEncrypt}
          className={classes.buttonEnc}
          type="submit"
        >
          Encrypt
        </Button>
        <Button
          onClick={handleDecrypt}
          className={classes.buttonDec}
          type="submit"
        >
          Decrypt
        </Button>
        <div className={classes.output}>
          <Typography variant="body1" align="left">
            {outputTitle}
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
