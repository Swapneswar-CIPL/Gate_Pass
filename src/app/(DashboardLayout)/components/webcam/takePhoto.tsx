import { Box, Button, Grid, Modal, styled } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const TakePhoto = (props: any) => {
  const [click, setClick] = useState(0);
  const [image, setImage] = useState("");
  const webcamRef: any = useRef(null);

  const style = {
    // position: 'absolute' as 'absolute',
    // top: '35%',
    // right: '0%',
    // transform: 'translate(-50%, -50%)',
    // height: '202px',
    // border:"8px solid"
    justifyContent: "center",
    alignItems: "center",
  };

  const style2 = {
    // position: 'absolute' as 'absolute',
    // top: '50%',
    // right: '12%',
    // transform: 'translate(-50%, -50%)',
  };

  const WebcamButton = styled("button")({
    // padding: '4px 20px',
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",

    "&:hover": {
      backgroundColor: "#45a049",
    },
  });

  const RetakeButton = styled("button")({
    padding: "4px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginLeft: "-50px",
    marginTop: "8px",

    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  });

  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef?.current?.getScreenshot();
  //   setImage(imageSrc);
  //   props.setPicture(imageSrc);
  //   props.setOpen(false);
  // }, []);

  const capture = useCallback(() => {
    try {
      const imageSrc = webcamRef?.current?.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
        props.setPicture(imageSrc);
        props.setOpen(false);
      } else {
        console.error("Failed to capture screenshot.");
      }
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  }, [webcamRef, setImage, props.setPicture, props.setOpen]);
  

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={style}>
          {image == "" ? (
            <Webcam
              audio={false}
              height={250}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={250}
              style={{marginTop: "30px"}}
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={image} />
          )}
        </Box>

        
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
      <Box sx={style2}>
          {image != "" ? (
            <RetakeButton
              onClick={(e) => {
                e.preventDefault();
                setImage("");
                setClick(0);
              }}
            >
              Retake
            </RetakeButton>
          ) : (
            <WebcamButton
              onClick={(e) => {
                e.preventDefault();
                capture();
                setClick(click + 1);
              }}
            >
              Capture
            </WebcamButton>
          )}
        </Box></Grid>
    </>
  );
};

export default TakePhoto;
