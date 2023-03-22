import React from "react";
import { useState, useContext } from "react";
import { AppState } from "../App";

const Login = () => {
  const App = useContext(AppState);
  const { ethereum } = window;
  const [error, setError] = useState("");

  const LoginWallet = async () => {
    if (!window.ethereum) {
      alert("Install Metamask");
    } else {
      try {
        await ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        App.setAddress(accounts[0]);
        const chainId = await ethereum.request({ method: "eth_chainId" });

        if (chainId != "0x5") {
          App.setLogin(false);
          alert("Select Goerlli chain");
        } else {
          App.setLogin(true);
          App.setCurrency("Eth");
          App.setTransactionContractAddress(
            "0xd2e7259c006d9e334f098a0fa37b15e19de06823"
          );
          App.setExplorer("https://goerli.etherscan.io/");
        }
      } catch (error) {
        setError(`"${error.message}"`);
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-w-full h-4/5 flex justify-center flex-col items-center">
      {/* <img className='h-20' src='metamask.svg' /> */}
      <div className="w-1/3 h-40 mt-4 bg-green-900 bg-opacity-70 p-2 rounded-lg shadow-lg border-opacity-40 border-4 border-black flex flex-col justify-center items-center">
        <h1 className="text-white text-2xl font-medium text-center py-3">
          Login
        </h1>

        <div
          onClick={LoginWallet}
          className="flex border-opacity-60 bg-opacity-90 text-base items-center font-medium border-2 border-green-900 cursor-pointer bg-blue-900 text-white rounded-lg justify-center py-1 px-2"
        >
          Connect To Metamask
          <img className="h-10 mx-5" src="metamask.svg" />
        </div>
        {/* <p className='text-red-500 font-bold text-sm mt-2'>{error}</p>       */}
      </div>
    </div>
  );
};

export default Login;
