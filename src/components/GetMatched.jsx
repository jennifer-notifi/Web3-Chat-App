import React, { useState, useEffect } from "react";

const GetMatched = () => {
  const [addressData, setAddressData] = useState([]);
  const [matchedAddress, setMatchedAddress] = useState();
  const [getAddressData, setGetAddressData] = useState(false);

  var duneHeaders = new Headers();
  duneHeaders.append("x-dune-api-key", "UfwtCgP59CHm1mKkEd7TJVMl1m20e4gN");

  async function fetchAddressData() {
    const response = await fetch(
      "https://api.dune.com/api/v1/query/1532463/execute",
      {
        method: "POST",
        headers: duneHeaders,
      }
    );
    const data = await response.json();
    setAddressData(data);
  }

  useEffect(() => {
    if (getAddressData) {
      fetchAddressData();
    }
  }, [getAddressData]);

  function randomMatch() {
    return addressData[Math.floor(Math.random() * addressData.length)];
  }

  useEffect(() => {
    const randomMatchAddress = randomMatch();
    setMatchedAddress(randomMatchAddress);
  });

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">
        Get Matched With Web3 Friends Like You
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Enter in your wallet address and we'll find you a friend to chat with.
          We'll match you based on your wallet interactions.
        </p>
        <div className="form-group">
          <label>Wallet Address</label>
          <input
            type="text"
            className="form-control"
            id="wallet_address"
            aria-describedby="emailHelp"
            placeholder="Enter wallet address"
          />
        </div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button
            onClick={() => setGetAddressData(true)}
            type="button"
            className="btn btn-primary btn-lg px-4 gap-3"
          >
            Get Matched
          </button>
        </div>
        {matchedAddress ? (
          <p className="lead mb-4">Your match is: {matchedAddress}</p>
        ) : null}
      </div>
    </div>
  );
};

export default GetMatched;
