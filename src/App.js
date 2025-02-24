import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, Typography, IconButton, TextField } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import BottomSheet from "./BottomSheet";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/system";

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const ShakingTextField = styled(TextField)(({ shakeError }) => ({
  animation: shakeError ? `${shake} 0.3s ease-in-out` : "none",
}));

const App = () => {
  const [open, setOpen] = useState(false);
  const [bottomSheetStep, setBottomSheetStep] = useState(1);
  const [bottomSheetTitle, setBottomSheetTitle] = useState("");
  const [inputValues, setInputValues] = useState(["", ""]);
  const [inputError, setInputError] = useState([false, false]);
  const [shakeError, setShakeError] = useState([false, false]);

  const handleButtonClick = (buttonTitle) => {
    setBottomSheetStep(1);
    setBottomSheetTitle(buttonTitle);
    setOpen(true);
  };

  const handleNextStep = () => {
    setBottomSheetStep(2);
  };

  const handleSubmit = () => {
    const newInputError = [!inputValues[0], !inputValues[1]];
    setInputError(newInputError);
    setShakeError(newInputError);

    if (!newInputError.includes(true)) {
      alert("Form Submitted!");
      setOpen(false);
    }

    setTimeout(() => setShakeError([false, false]), 300);
  };

  const handleInputChange = (index, e) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);

    const newInputError = [...inputError];
    newInputError[index] = e.target.value === "";
    setInputError(newInputError);
    setShakeError(newInputError);

    if (e.target.value === "") {
      setTimeout(() => {
        setShakeError([false, false]);
      }, 300);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: 2, px:"12px" }}>
        {[1, 2, 3, 4].map((num) => (
          <Button
            key={num}
            variant="outlined"
            color="primary"
            sx={{ height: "74px", width: "100%", mx: "12px", mb: 2 }}
            onClick={() => handleButtonClick(`Button ${num}`)}
          >
            Button {num}
          </Button>
        ))}
      </Box>

      <BottomSheet open={open} setOpen={setOpen} animateHeight>
        <Box sx={{ position: "relative", p: 2 }}>
          <Typography variant="h6">{bottomSheetTitle}</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <ExpandMoreIcon />
          </IconButton>

          {bottomSheetStep === 1 ? (
            <Button variant="outlined" color="secondary" sx={{ width: "100%", mt: 2 }} onClick={handleNextStep}>
              Proceed
            </Button>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Input here
              </Typography>
              <ShakingTextField
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                placeholder="Enter text 1"
                value={inputValues[0]}
                onChange={(e) => handleInputChange(0, e)}
                error={inputError[0]}
                helperText={inputError[0] ? "Input is required" : ""}
                shakeError={shakeError[0]}
              />
              <ShakingTextField
                variant="outlined"
                fullWidth
                placeholder="Enter text 2"
                value={inputValues[1]}
                onChange={(e) => handleInputChange(1, e)}
                error={inputError[1]}
                helperText={inputError[1] ? "Input is required" : ""}
                shakeError={shakeError[1]}
              />
              <Button variant="outlined" color="secondary" sx={{ width: "100%", mt: 2 }} onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </div>
  );
};

export default App;
