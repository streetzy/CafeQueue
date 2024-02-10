import React, { useEffect, useState } from "react";

export default function Index() {
  const [unpreparedOrders, setUnpreparedOrders] = useState([]);
  const [preparedOrders, setPreparedOrders] = useState([]);
  const [locations, setLocations] = useState([]);
  const [prompt, setPrompt] = useState("");
  return (
    <div className="h-screen w-screen">
      {prompt === "addLocation" && (
        <div className="w-1/2 h-1/2 bg-[#5B3739] absolute top-1/4 left-1/4 border-[2px] rounded-3xl border-[#38211e] flex flex-col">
          <div className="justify-center w-full h-1/4 flex justify-center items-center">
            <p className="text-4xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              ADD LOCATION
            </p>
          </div>
          <div className="flex flex-col w-full h-2/4 gap-3 items-center">
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Location Name:
            </p>
            <input
              type="text"
              id="addedLocationName"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter location name..."
            />
          </div>
          <div className="h-1/4 w-full flex justify-center items-center">
            <button
              onClick={async () => {
                await fetch("http://localhost:8000/locations/:locationID", {
                  headers: {
                    "Content-Type": "text/plain",
                  },
                  mode: "cors",
                  method: "POST",
                  body: `${
                    (
                      document.getElementById(
                        "addedLocationName"
                      ) as HTMLInputElement
                    ).value
                  }`,
                });
                setPrompt("");
              }}
              className="w-1/4 h-1/2 bg-[#4a2c29] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)] rounded-3xl pb-1"
            >
              Done
            </button>
          </div>
        </div>
      )}
      {prompt === "deleteLocation" && (
        <div className="w-1/2 h-1/2 bg-[#5B3739] absolute top-1/4 left-1/4 border-[2px] rounded-3xl border-[#38211e] flex flex-col">
          <div className="justify-center w-full h-1/4 flex justify-center items-center">
            <p className="text-4xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              DELETE LOCATION
            </p>
          </div>
          <div className="flex flex-col w-full h-2/4 gap-3 items-center">
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Location Name:
            </p>
            <input
              type="text"
              id="deleteLocationName"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter location name..."
            />
          </div>
          <div className="h-1/4 w-full flex justify-center items-center">
            <button
              onClick={() => setPrompt("")}
              className="w-1/4 h-1/2 bg-[#4a2c29] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)] rounded-3xl pb-1"
            >
              Done
            </button>
          </div>
        </div>
      )}
      {prompt === "addOrder" && (
        <div className="w-1/2 h-1/2 bg-[#5B3739] absolute top-1/4 left-1/4 border-[2px] rounded-3xl border-[#38211e] flex flex-col">
          <div className="justify-center w-full h-1/4 flex justify-center items-center">
            <p className="text-4xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              ADD ORDER
            </p>
          </div>
          <div className="flex flex-col w-full h-2/4 gap-3 items-center">
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Order Description:
            </p>
            <input
              type="text"
              id="orderDescription"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter order description..."
            />
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Location Number:
            </p>
            <input
              type="number"
              min="1"
              name="locationNumber"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter location number..."
            />
          </div>
          <div className="h-1/4 w-full flex justify-center items-center">
            <button
              onClick={() => setPrompt("")}
              className="w-1/4 h-1/2 bg-[#4a2c29] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)] rounded-3xl pb-1"
            >
              Done
            </button>
          </div>
        </div>
      )}
      {prompt === "prepareOrder" && (
        <div className="w-1/2 h-1/2 bg-[#5B3739] absolute top-1/4 left-1/4 border-[2px] rounded-3xl border-[#38211e] flex flex-col">
          <div className="justify-center w-full h-1/4 flex justify-center items-center">
            <p className="text-4xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              PREPARE ORDER
            </p>
          </div>
          <div className="flex flex-col w-full h-2/4 gap-3 items-center">
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Order Number
            </p>
            <input
              type="number"
              min="1"
              id="preparedOrderNumber"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter order number..."
            />
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Location Number
            </p>
            <input
              type="number"
              min="1"
              id="preparedLocationNumber"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter location number..."
            />
          </div>
          <div className="h-1/4 w-full flex justify-center items-center">
            <button
              onClick={() => setPrompt("")}
              className="w-1/4 h-1/2 bg-[#4a2c29] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)] rounded-3xl pb-1"
            >
              Done
            </button>
          </div>
        </div>
      )}
      {prompt === "pickUpOrder" && (
        <div className="w-1/2 h-1/2 bg-[#5B3739] absolute top-1/4 left-1/4 border-[2px] rounded-3xl border-[#38211e] flex flex-col">
          <div className="justify-center w-full h-1/4 flex justify-center items-center">
            <p className="text-4xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              PICK UP ORDER
            </p>
          </div>
          <div className="flex flex-col w-full h-2/4 gap-3 items-center">
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Order Number
            </p>
            <input
              type="number"
              min="1"
              id="pickedUpOrderNumber"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter order number..."
            />
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Location Number
            </p>
            <input
              type="number"
              min="1"
              id="pickedUpLocationNumber"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter location number..."
            />
          </div>
          <div className="h-1/4 w-full flex justify-center items-center">
            <button
              onClick={() => setPrompt("")}
              className="w-1/4 h-1/2 bg-[#4a2c29] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)] rounded-3xl pb-1"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div className=" h-full w-full flex flex-col justify-center items-center gap-5 py-5">
        {/* Viewing Panel */}
        <div className="w-9/12 h-5/6 border-[2px] rounded-3xl border-[#38211e] flex flex-row overflow-hidden shadow-[0_0_8px_#301d1e]">
          <div className="w-6/12 h-full border-r-[2px] border-[#38211e]">
            {/* Titles */}
            <div className="flex flex-col w-full h-1/6 border-b-[2px] border-[#38211e]">
              {/* Prepared title */}
              <div className="w-full h-1/2 border-b-[2px] border-[#704241] flex justify-center items-center bg-[#5B3739]">
                <p className="text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                  PREPARING
                </p>
              </div>
              {/* Order & Location */}
              <div className="w-full h-1/2 flex flex-row">
                {/* Order */}
                <div className="w-1/2 h-full flex justify-center items-center border-r-[2px] border-[#704241] bg-[#5B3739]">
                  <p className="text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                    ORDER NUMBER
                  </p>
                </div>
                {/* Location */}
                <div className="w-1/2 h-full flex justify-center items-center bg-[#5B3739]">
                  <p className="text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                    LOCATION NUMBER
                  </p>
                </div>
              </div>
            </div>
            {/* Actual orders themselves */}
            <div className="w-full h-5/6 bg-[#503031]"></div>
          </div>

          {/* Prepared */}
          <div className="w-6/12 h-full">
            {/* Titles */}
            <div className="flex flex-col w-full h-1/6 border-b-[2px] border-[#38211e]">
              {/* Prepared title */}
              <div className="w-full h-1/2 border-b-[2px] border-[#704241] flex justify-center items-center bg-[#5B3739]">
                <p className="text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                  PREPARED
                </p>
              </div>
              {/* Order & Location */}
              <div className="w-full h-1/2 flex flex-row">
                {/* Order */}
                <div className="w-1/2 h-full flex justify-center items-center border-r-[2px] border-[#704241] bg-[#5B3739]">
                  <p className="text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                    ORDER NUMBER
                  </p>
                </div>
                {/* Location */}
                <div className="w-1/2 h-full flex justify-center items-center bg-[#5B3739]">
                  <p className="text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                    LOCATION NUMBER
                  </p>
                </div>
              </div>
            </div>
            {/* Actual prepared orders */}
            <div className="h-5/6 w-full bg-[#503031]"></div>
          </div>
        </div>
        {/* Admin Panel */}
        <div className="flex flex-row w-9/12 h-1/6 border-[2px] border-[#38211e] overflow-hidden rounded-3xl shadow-[0_0_8px_#301d1e]">
          {/* Add location */}
          <button
            onClick={() => setPrompt("addLocation")}
            className="border-r-[2px] border-[#38211e] p-0 w-1/5 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            ADD LOCATION
          </button>
          {/* Delete location */}
          <button
            onClick={() => setPrompt("deleteLocation")}
            className="border-r-[2px] border-[#38211e] p-0 w-1/5 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            DELETE LOCATION
          </button>
          {/* Add order */}
          <button
            onClick={() => setPrompt("addOrder")}
            className="border-r-[2px] border-[#38211e] p-0 w-1/5 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            ADD ORDER
          </button>
          {/* Order prepared for pickup */}
          <button
            onClick={() => setPrompt("prepareOrder")}
            className="border-r-[2px] border-[#38211e] p-0 w-1/5 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            ORDER PREPARED
          </button>
          {/* Order picked up */}
          <button
            onClick={() => setPrompt("pickUpOrder")}
            className="p-0 w-1/5 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            ORDER PICKED UP
          </button>
        </div>
      </div>
    </div>
  );
}
