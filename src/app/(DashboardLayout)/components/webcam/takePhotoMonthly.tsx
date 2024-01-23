// import { Box, Button, Modal, styled } from '@mui/material';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import Webcam from 'react-webcam';

//   const WebcamComponent = () => <Webcam />;

//   const videoConstraints = {
//     width: 220,
//     height: 200,
//     facingMode: "user"
// };

// const TakePhotoM=(props:any)=> {

//   const [click, setClick] = useState(0)

//   const [image,setImage]=useState('');
//   const webcamRef:any = useRef(null);
//   const style = {
//     position: 'absolute' as 'absolute',
//     top: '35%',
//     right: '0%',
//     transform: 'translate(-50%, -50%)',
//     height: '202px',
//   };

//   const style2 = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     right: '12%',
//     transform: 'translate(-50%, -50%)',
//   };

// const btn = {
// background:"#E15A11",
// "&:hover": {
//   backgroundColor: "#E15A11",
// },
// }

// const style3={
//     position: 'absolute' as 'absolute',
//     top: '30%',
//     left: '75%',
//     transform: 'translate(-50%, -50%)',
//     height:'200px',
//     border: '2px solid #000',
//     boxShadow: 24,
//     display:"grid"
// }

//   const capture= useCallback(
//       () => {
//       const imageSrc = webcamRef?.current?.getScreenshot();
//       setImage(imageSrc)
//       },[])

//       const handleSubmit = async()=>{
//         props.setPicture(image)
//         props.setOpen(false)
//         alert("Photo is saved")
//       }

//   return (
//     <>
//     <Modal
//     keepMounted
//     open={props.open}
//     onClose={props.handleClose}
//     aria-labelledby="keep-mounted-modal-title"
//     aria-describedby="keep-mounted-modal-description"
//     >

//     <>
//     <Box sx={style}>
//     {image == '' ? <Webcam
//                     audio={false}
//                     height={200}
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     width={220}
//                     videoConstraints={videoConstraints}
//                 /> : <img src={image} />}
//     </Box>

//     <Box sx={style2}>
//                 {image != '' ?
//                     <button onClick={(e) => {
//                         e.preventDefault();
//                         setImage('')
//                         setClick(0)
//                     }}
//                         className="webcam-btn">
//                         Retake Image</button> :
//                     <button onClick={(e) => {
//                         e.preventDefault();
//                         capture();
//                         setClick(click+1)

//                     }}
//                         className="webcam-btn">Capture</button>
//                 }
//             </Box>

//             <Box sx={style3}>
//               <img src={image}/>
//               <Button variant='contained' sx={click===0?{display:'none'}:btn} onClick={handleSubmit}>Submit</Button>
//             </Box>
//             </>
//     </Modal>
//     </>
//   );
// }

// export default TakePhotoM;

import { Box, Button, Grid, Modal, styled } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const TakePhotoM = (props: any) => {
  const [click, setClick] = useState(0);
  const [image, setImage] = useState("");
  const webcamRef: any = useRef(null);

  const style = {
    // position: 'absolute' as 'absolute',
    // top: '35%',
    // right: '0%',
    // transform: 'translate(-50%, -50%)',
    // height: '202px',

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
    marginBottom: "80px",
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
      <Grid container justifyContent="center" alignItems="center">
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
      <Grid container justifyContent="center" alignItems="center">
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
        </Box>
      </Grid>
    </>
  );
};

export default TakePhotoM;
