import React from "react";
import { useContext, useState, useEffect } from "react";
import { AppState } from "../App";
import { Bars, TailSpin } from "react-loader-spinner";
import PopUpCamera from "./PopUpCamera";
import PopUpValidation from "./PopUpValidation";

const Send = () => {
  const App = useContext(AppState);

  const [buttonPopUp, setButtonPopUp] = useState(false);
  // const [address, setAddress] = useState("");
  const [openVerify, setOpenVerify] = useState(false);
  // const [effect, setEffect] = useState(false);

  const cameraPopUpFunctions = (value) => {
    setButtonPopUp(value);
  };

  const changeAddressValue = (addrs) => {
    // setAddress(addrs);
    App.setRecipientAddress(addrs);
  };

  const verifyButtonFunctions = () => {
    App.handleVerify();
    // setEffect(true);
    setOpenVerify(true);
  };

  return (
    <div className="flex flex-col justify-center items-center text-white">
      {/* Balance */}
      <div className="flex w-4/5 justify-around border-rounded items-center mt-7">
        <div
          onClick={() => {
            setButtonPopUp(true);
          }}
          className="flex cursor-pointer  justify-center items-center border-2 border-blue-900 border-opacity-60 p-3 bg-black bg-opacity-70 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-qr-code-scan"
            viewBox="0 0 16 16"
          >
            <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z" />
            <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z" />
            <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z" />
            <path d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z" />
            <path d="M12 9h2V8h-2v1Z" />
          </svg>
          <h1 className="text-white text-lg font-medium ml-2">Scan</h1>
        </div>
        <div className="flex items-center border-2 border-blue-900 border-opacity-60 p-3 bg-black rounded-lg bg-opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="ml-2 bi bi-wallet2"
            viewBox="0 0 16 16"
          >
            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
          </svg>
          {/* <h1 className="ml-2 text-lg font-medium">Balance :</h1> */}
          <h1 className=" text-lg font-medium mx-5">
            {App.balance.slice(0, 5)} {App.currency}
          </h1>
        </div>
      </div>
      <PopUpCamera
        trigger={buttonPopUp}
        setTrigger={cameraPopUpFunctions}
        onScanning={changeAddressValue}
      >
        <h3>My Popup</h3>
      </PopUpCamera>
      {/* Transfer funds */}
      <div className="flex w-3/5 justify-between items-center mt-5 ml-5">
        <input
          onChange={(e) => {
            App.setRecipientAddress(e.target.value);
            // setAddress(e.target.value);
          }}
          value={App.recipientAddress}
          className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
          placeholder={"Address"}
        />
        <button
          type="button"
          onClick={verifyButtonFunctions}
          className="flex bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Verify
        </button>
        <PopUpValidation
          open={openVerify}
          onClose={() => {
            setOpenVerify(false);
            App.setS1("");
            App.setS2("");
            App.setS3(false);
          }}
          category={App.s1}
          privacy={App.s2}
          authorized={App.s3}
        />
      </div>

      {/* Amount */}
      <div className="flex w-3/5 justify-between items-center mt-5 ml-5">
        <input
          onChange={(e) => App.setAmount(e.target.value)}
          value={App.amount}
          type={"number"}
          step="0.001"
          className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
          placeholder={"Amount"}
        />
      </div>

      {/* Transfer */}
      {App.txLoading ? (
        <div className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
          <Bars width={30} height={46} color={"white"} />
        </div>
      ) : (
        <div
          onClick={App.transferAmount}
          className="flex mt-4 w-3/5 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg"
        >
          Transfer
        </div>
      )}
      {/* Recent Tx section */}
      <div
        className={`${
          App.showRecentTx ? "" : "hidden"
        } bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-4/5 mt-2`}
      >
        <div className="flex w-full items-center justify-center rounded-t-lg">
          <div className="w-4/6 py-2 px-2">
            <p className="text-xl font-mono">
              Amount: {App.recentTx.amount} {App.recentTx.symbol}
            </p>
            <p className="text-xs font-mono">to: {App.recentTx.to}</p>
          </div>
          {App.saveTxLoad ? (
            <div className="flex justify-center bg-green-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">
              <TailSpin height={18} width={18} color={"white"} />
            </div>
          ) : (
            <button
              onClick={App.saveTx}
              className="bg-green-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md"
            >
              Save
            </button>
          )}
          <button
            onClick={() => App.setShowRecentTx(false)}
            className="bg-red-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md"
          >
            Ignore
          </button>
        </div>
        <a target={"_blank"} href={`${App.explorer}/tx/${App.recentTx.txhash}`}>
          <div className="font-mono w-full rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
            View Transaction
          </div>
        </a>
      </div>
    </div>
  );
};

export default Send;
