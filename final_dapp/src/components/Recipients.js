import React, { useState, useContext, useEffect } from "react";
import { AppState } from "../App";

const Recipients = () => {
  const App = useContext(AppState);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [data, setData] = useState([]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    async function getData() {
      const recipients = await App.transactionContract.filters.recipeints(
        App.address
      );
      const recipentsData = await App.transactionContract.queryFilter(
        recipients
      );
      setData(recipentsData);
    }

    getData();
  }, [num]);

  const Add_address = async () => {
    try {
      const tx = await App.transactionContract.addressRecipient(
        recipientAddress,
        recipientName
      );
      await tx.wait();
      alert("Address Saved Sucessfully!");
      setRecipientAddress("");
      setRecipientName("");
    } catch (error) {
      alert(error.message);
    }
    let nextnum = num + 1;
    setNum(nextnum);
  };

  const setRecipient = (address, name) => {
    App.setRecipientAddress(address);
  };

  return (
    <div className="px-3 py-4 flex flex-col justify-center items-center text-white">
      <input
        onChange={(e) => setRecipientAddress(e.target.value)}
        value={recipientAddress}
        className="w-3/4 mt-2 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none 
       rounded-lg"
        placeholder={"Recipient Address"}
      />
      <input
        onChange={(e) => setRecipientName(e.target.value)}
        value={recipientName}
        className="mt-2 w-3/4  p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none 
       rounded-lg"
        placeholder={"Recipient Name"}
      />

      <div
        onClick={Add_address}
        className="flex mt-4 w-3/4 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg"
      >
        Add Recipient
      </div>
      <div className="flex flex-col items-center justify-center mt-4 w-full">
        {data.map((e) => {
          return (
            <div
              onClick={() =>
                setRecipient(e.args.recipient, e.args.recipientName)
              }
              className={`bg-black cursor-pointer rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-3/4 mt-2`}
            >
              <div className="flex w-full items-center justify-center rounded-t-lg">
                <div className="w-full py-2 px-2">
                  <p className="text-xl font-mono">
                    Name: {e.args.recipientName}
                  </p>
                  <p className="text-xs font-mono">
                    address: {e.args.recipient}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recipients;
