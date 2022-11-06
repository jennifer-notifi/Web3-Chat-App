import React, { useState, useEffect } from "react";
import ChatStarted from "./ChatStart";

const GetMatched = () => {
  const [addressData, setAddressData] = useState([]);
  const [executionId, setExecutionId] = useState();
  const [matchedAddress, setMatchedAddress] = useState();
  const [getAddressData, setGetAddressData] = useState(false);

  var duneHeaders = new Headers();
  duneHeaders.append("x-dune-api-key", "UfwtCgP59CHm1mKkEd7TJVMl1m20e4gN");

  async function fetchExecutionId() {
    const response = await fetch(
      "https://api.dune.com/api/v2/query/1532463/execute",
      {
        method: "POST",
        headers: duneHeaders,
      }
    );
    const data = await response.json();
    setExecutionId(data.execution_id);
  }

  async function fetchAddressData() {
    const response = await fetch(
      `https://api.dune.com/api/v2/execution/${executionId}/results`,
      {
        method: "GET",
        headers: duneHeaders,
      }
    );
    const data = await response.json();
    setAddressData(data?.result?.rows);
  }

  useEffect(() => {
    if (getAddressData) {
      fetchExecutionId();
    }
  }, [getAddressData]);

  useEffect(() => {
    if (executionId) {
      fetchAddressData();
    }
  }, [executionId]);

  function randomMatch() {
    return addressData[Math.floor(Math.random() * addressData.length)];
  }

  useEffect(() => {
    const randomMatchAddress = randomMatch() || '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
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
          <label>Wallet Address:</label>
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
        <ChatStarted />
      </div>
    </div>
  );
};

export default GetMatched;
