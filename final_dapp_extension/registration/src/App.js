import "./App.css";
import { useState } from "react";
import { getDatabase } from "firebase/database";
import { get, child, ref } from "firebase/database";
import { dataref } from "./firebase";
import CryptoJS from "crypto-js";

function App() {
  const [name, setName] = useState("");
  const [nid, setNid] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
    // console.log(name);
  }

  function handleNidChange(event) {
    setNid(event.target.value);
    // console.log(nid);
  }

  function handleAddressChange(event) {
    setAddress(event.target.value);
    // console.log(address);
  }

  function handlePhoneNumberChange(event) {
    setPhoneNumber(event.target.value);
    // console.log(phoneNumber);
  }

  function handleOccupationChange(event) {
    setOccupation(event.target.value);
    // console.log(occupation);
  }

  function handleWalletAddressChange(event) {
    setWalletAddress(event.target.value);
    // console.log(walletAddress);
  }

  const encryption = (value) => {
    var encrypted = CryptoJS.AES.encrypt(value, "12334");
    return encrypted.toString();
  };

  const decryption = (value) => {
    var decrypted = CryptoJS.AES.decrypt(value, "12334");
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const handleInsert = () => {
    dataref.ref("User Information/" + nid).set({
      name: encryption(name),
      address: encryption(address),
      phoneNumber: encryption(phoneNumber),
      occupation: encryption(occupation),
      walletAddress: encryption(walletAddress),
    });
    setName("");
    setAddress("");
    setWalletAddress("");
    setOccupation("");
    setPhoneNumber("");
    setNid("");
  };

  const db = getDatabase();
  const handleRead = () => {
    const dbref = ref(db);

    get(child(dbref, "User Information/" + nid)).then((snapshot) => {
      if (snapshot.exists()) {
        setName(decryption(snapshot.child("name").val()));
        setAddress(decryption(snapshot.child("address").val()));
        setPhoneNumber(decryption(snapshot.child("phoneNumber").val()));
        setOccupation(decryption(snapshot.child("occupation").val()));
        setWalletAddress(decryption(snapshot.child("walletAddress").val()));
      }
    });
  };

  // function handleRead() {
  //   onValue(
  //     ref(db, (snapshot) => {
  //       const data = snapshot.val();
  //       if (data !== null) {
  //         Object.values(data).map((data) => {
  //           setData((oldArray) => [...oldArray, data]);
  //         });
  //       }
  //     })
  //   );
  //   console.log(data);
  // }

  // function handleInsert() {
  //   // Code to insert data to Firebase

  //   // console.log(name, address, phoneNumber, occupation, walletAddress);

  //   set(ref(db, "User Information/" + nid), {
  //     name: name,
  //     address: address,
  //     phoneNumber: phoneNumber,
  //     occupation: occupation,
  //     walletAddress: walletAddress,
  //   });
  //   setAddress("");
  //   setName("");
  //   setWalletAddress("");
  //   setOccupation("");
  //   setPhoneNumber("");
  //   setNid("");
  // }

  function handleUpdate() {
    handleInsert();
  }

  // function handleDelete() {
  //   // Code to delete data from Firebase
  //   remove(ref(db, nid));
  // }

  return (
    <div className="App">
      <h2>CRUD with Firebase</h2>
      <hr />
      <br />
      <div className="form">
        Name:&nbsp;{" "}
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleNameChange}
        />{" "}
        <br />
        <br />
        NID:{" "}
        <input
          type="text"
          name="nid"
          id="nid"
          value={nid}
          onChange={handleNidChange}
        />{" "}
        <br />
        <br />
        Address:{" "}
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={handleAddressChange}
        />{" "}
        <br />
        <br />
        Phone Number:{" "}
        <input
          type="text"
          name="phone number"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />{" "}
        <br />
        <br />
        Occupation:{" "}
        <input
          type="text"
          name="occupation"
          id="occupation"
          value={occupation}
          onChange={handleOccupationChange}
        />{" "}
        <br />
        <br />
        Wallet Address:{" "}
        <input
          type="text"
          name="wallet address"
          id="walletAddress"
          value={walletAddress}
          onChange={handleWalletAddressChange}
        />{" "}
        <br />
        <br />
      </div>

      <div className="buttons">
        <button id="insert" onClick={handleInsert}>
          Insert
        </button>
        <button id="read" onClick={handleRead}>
          Read
        </button>
        {/* <button id="update" onClick={handleUpdate}>
          Update
        </button>
        <button id="delete" onClick={handleDelete}>
          Delete
        </button> */}
      </div>
    </div>
  );
}

export default App;
