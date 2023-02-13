import React, { useRef, useState, useEffect } from "react";
import "./PopUpCamera.css";
import QrReader from "react-qr-reader";

const PopUpCamera = (props) => {
  const [result, setResult] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const ref = useRef(null);

  const handleScan = (data) => {
    setResult(data);
    setScannedData(data);
    if (data !== null) {
      ref.current.stopCamera();
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  useEffect(() => {
    props.setTrigger(false);
    props.onScanning(scannedData);
    setResult(null);
  }, [result]);

  // if (result && result !== "") {
  //   props.onScanning(result);
  // }

  return props.trigger ? (
    <div className="overlay">
      <div className="popup">
        <div className="popup-inner rounded-lg">
          <button
            className="close-button"
            onClick={() => props.setTrigger(false)}
          >
            X
          </button>
          <QrReader
            ref={ref}
            style={{ width: "60%" }}
            facingMode="user"
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopUpCamera;
