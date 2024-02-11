import React, { useEffect, useState } from "react";

export type Order = {
  id: number;
  description: string;
  isPrepared: boolean;
};

export type RestaurantLocation = {
  id: number;
  name: string;
  orders: Order[];
};

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [locations, setLocations] = useState<RestaurantLocation[]>([]);
  const [update, setUpdate] = useState(false);

  // Every time the user interacts w/ buttons, we gain data from the server about locations and save that
  useEffect(() => {
    const fetchLocationsData = async () => {
      await fetch("http://localhost:8080/locations")
        .then((res) => res.json())
        .then((data) => {
          setLocations(data);
          console.log(data);
        });
    };

    fetchLocationsData();
  }, [update]);

  // To refresh useEffect when there is an interaction with the backend.
  function invertUpdateBool() {
    return setUpdate(!update);
  }

  return (
    <div className="h-screen w-screen">
      {/* Prompts, i.e. when the administrator clicks a button, some sort of interface is brought up */}
      {/* For the first few buttons w/ fetches, the format goes something along:
          Get inputs from the administrator, send that over to the backend via values from the inputs 
          (in some cases false/true for the prepared state for the order)
          These buttons also invert the update bool for the useEffect.
      */}
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
                await fetch("http://localhost:8080/locations", {
                  headers: {
                    "Content-Type": "text/plain",
                  },
                  mode: "cors",
                  method: "POST",
                  body: `${(
                    document.getElementById(
                      "addedLocationName"
                    ) as HTMLInputElement
                  ).value.toLowerCase()}`,
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
              onClick={async () => {
                await fetch(
                  `http://localhost:8080/locations/${(
                    document.getElementById(
                      "deleteLocationName"
                    ) as HTMLInputElement
                  ).value.toLowerCase()}`,
                  {
                    headers: {
                      "Content-Type": "text/plain",
                    },
                    mode: "cors",
                    method: "DELETE",
                    body: `${
                      (
                        document.getElementById(
                          "deleteLocationName"
                        ) as HTMLInputElement
                      ).value
                    }`,
                  }
                );
                setPrompt("");
                invertUpdateBool();
              }}
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
              Location Name:
            </p>
            <input
              type="text"
              id="orderLocationName"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter location name..."
            />
          </div>
          <div className="h-1/4 w-full flex justify-center items-center">
            <button
              onClick={async () => {
                await fetch(
                  `http://localhost:8080/locations/${(
                    document.getElementById(
                      "orderLocationName"
                    ) as HTMLInputElement
                  ).value.toLowerCase()}/orders`,
                  {
                    headers: {
                      "Content-Type": "text/plain",
                    },
                    mode: "cors",
                    method: "POST",
                    body: JSON.stringify([
                      (
                        document.getElementById(
                          "orderDescription"
                        ) as HTMLInputElement
                      ).value,
                      false,
                    ]),
                  }
                );
                setPrompt("");
                invertUpdateBool();
              }}
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
              Order Number:
            </p>
            <input
              type="number"
              min="1"
              id="preparedOrderNumber"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter order number..."
            />
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Location Name:
            </p>
            <input
              type="text"
              id="preparedLocationName"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter location name..."
            />
          </div>
          <div className="h-1/4 w-full flex justify-center items-center">
            <button
              onClick={async () => {
                await fetch(
                  `http://localhost:8080/locations/${(
                    document.getElementById(
                      "preparedLocationName"
                    ) as HTMLInputElement
                  ).value.toLowerCase()}/orders/${
                    (
                      document.getElementById(
                        "preparedOrderNumber"
                      ) as HTMLInputElement
                    ).value
                  }`,
                  {
                    headers: {
                      "Content-Type": "text/plain",
                    },
                    mode: "cors",
                    method: "PATCH",
                    body: `${true}`,
                  }
                );
                setPrompt("");
                invertUpdateBool();
              }}
              className="w-1/4 h-1/2 bg-[#4a2c29] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)] rounded-3xl pb-1"
            >
              Done
            </button>
          </div>
        </div>
      )}
      {prompt === "pickUpOrder" && (
        <div className="w-1/2 h-1/2 bg-[#5B3739] absolute top-1/4 left-1/4 border-[2px] rounded-3xl border-[#38211e] flex flex-col">
          <div className="justify-center w-full h-1/4 flex items-center">
            <p className="text-4xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              PICK UP ORDER
            </p>
          </div>
          <div className="flex flex-col w-full h-2/4 gap-3 items-center">
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Order Number:
            </p>
            <input
              type="number"
              min="1"
              id="pickedUpOrderNumber"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter order number..."
            />
            <p className="text-3xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Location Name:
            </p>
            <input
              type="text"
              id="pickedUpLocationName"
              className="w-3/4 h-1/6 text-center text-3xl"
              placeholder="Enter location name..."
            />
          </div>
          <div className="h-1/4 w-full flex justify-center items-center">
            <button
              onClick={async () => {
                await fetch(
                  `http://localhost:8080/locations/${(
                    document.getElementById(
                      "pickedUpLocationName"
                    ) as HTMLInputElement
                  ).value.toLowerCase()}/orders/${
                    (
                      document.getElementById(
                        "pickedUpOrderNumber"
                      ) as HTMLInputElement
                    ).value
                  }`,
                  {
                    headers: {
                      "Content-Type": "text/plain",
                    },
                    mode: "cors",
                    method: "DELETE",
                    body: JSON.stringify([
                      (
                        document.getElementById(
                          "pickedUpOrderNumber"
                        ) as HTMLInputElement
                      ).value,
                      (
                        document.getElementById(
                          "pickedUpLocationName"
                        ) as HTMLInputElement
                      ).value,
                      true,
                    ]),
                  }
                );
                setPrompt("");
                invertUpdateBool();
              }}
              className="w-1/4 h-1/2 bg-[#4a2c29] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)] rounded-3xl pb-1"
            >
              Done
            </button>
          </div>
        </div>
      )}
      {/* 
        Opens a viewing panel where the administrator sees every location with dropdowns of every location
        dropdowns of every order, every dropdown has descriptions about each item.
      */}
      {prompt === "viewAll" && (
        <div className="w-full h-full bg-[#5B3739] absolute border-[2px] rounded-3xl border-[#38211e] flex flex-col">
          <div className="h-1/6 w-full flex justify-center items-center">
            <p className="text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
              Viewing Panel
            </p>
          </div>
          <div className="h-4/6 w-full border-[2px] rounded-3xl border-[#38211e] shadow-[0_0_8px_#301d1e] flex flex-col gap-1 overflow-y-auto">
            {/* Checks that the locations array exists
                goes through every location, creates a div for every location, w/ the dropdown, does the same for orders
                every dropdown has details about said item
            */}
            {locations != undefined &&
              locations.map((location, index) => (
                <div key={index}>
                  <details className="w-full bg-[#4a2c29] border border-[#38211e] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)] rounded-3xl pb-1 pl-4">
                    <summary>{location.name.toUpperCase()}</summary>
                    <p className="pl-3">
                      Location identifier is: {location.id}
                    </p>
                    {location.orders.map((order, index) => (
                      <details
                        key={index}
                        className="w-full bg-[#4a2c29] border border-[#38211e] text-[#ecdfe0] text-3xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)] rounded-3xl pb-1 pl-4"
                      >
                        <summary>{order.id}</summary>
                        <p className="w-full h-full bg-[#4a2c29] border border-[#38211e] text-[#ecdfe0] text-xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)] rounded-3xl pb-1 pl-4">
                          Description: {order.description}, is the food
                          prepared: {`${order.isPrepared}`}
                        </p>
                      </details>
                    ))}
                  </details>
                </div>
              ))}
          </div>
          <button
            onClick={() => setPrompt("")}
            className="text-4xl h-1/6 w-full text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            Close Panel
          </button>
        </div>
      )}

      <div className=" h-full w-full flex flex-col justify-center items-center gap-5 py-5">
        {/* Viewing Panel for users */}
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
            {/* Actual orders themselves
                Ensures that no locations w/out any orders are shown
                Then goes thru every location, gets its orders that AREN'T prepared
                Then w/ every order a div is written out w/ the order id its location id
            */}
            <div className="w-full h-5/6 bg-[#503031] overflow-y-auto">
              {locations != undefined &&
                locations
                  .filter((location) => location.orders.length != 0)
                  .map((location) =>
                    location.orders
                      .filter((order) => !order.isPrepared)
                      .map((order, index) => (
                        <div key={index} className="flex">
                          <p className="text-center flex-1 text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                            {order.id}
                          </p>
                          <p className="text-center flex-1 text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                            {location.id}
                          </p>
                        </div>
                      ))
                  )}
            </div>
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
            {/* Almost identical chunk of code as the unprepared orders, only difference is
                that here we are checking if the orders are prepared
            */}
            <div className="h-5/6 w-full bg-[#503031] overflow-y-auto">
              {locations != undefined &&
                locations
                  .filter((location) => location.orders.length != 0)
                  .map((location) =>
                    location.orders
                      .filter((order) => order.isPrepared)
                      .map((order, index) => (
                        <div key={index} className="flex">
                          <p className="text-center flex-1 text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                            {order.id}
                          </p>
                          <p className="text-center flex-1 text-4xl text-[#ecdfe0] leading-none font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                            {location.id}
                          </p>
                        </div>
                      ))
                  )}
            </div>
          </div>
        </div>
        {/* Admin Panel */}
        <div className="flex flex-row w-9/12 h-1/6 border-[2px] border-[#38211e] overflow-hidden rounded-3xl shadow-[0_0_8px_#301d1e]">
          {/* Add location */}
          <button
            onClick={() => setPrompt("addLocation")}
            className="border-r-[2px] border-[#38211e] p-0 w-1/6 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            ADD LOCATION
          </button>
          {/* Delete location */}
          <button
            onClick={() => setPrompt("deleteLocation")}
            className="border-r-[2px] border-[#38211e] p-0 w-1/6 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            DELETE LOCATION
          </button>
          {/* Add order */}
          <button
            onClick={() => setPrompt("addOrder")}
            className="border-r-[2px] border-[#38211e] p-0 w-1/6 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            ADD ORDER
          </button>
          {/* Order prepared for pickup */}
          <button
            onClick={() => setPrompt("prepareOrder")}
            className="border-r-[2px] border-[#38211e] p-0 w-1/6 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            ORDER PREPARED
          </button>
          {/* Order picked up */}
          <button
            onClick={() => setPrompt("pickUpOrder")}
            className="border-r-[2px] border-[#38211e] p-0 w-1/6 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            ORDER PICKED UP
          </button>
          {/* View all orders and locations and details about these */}
          <button
            onClick={() => setPrompt("viewAll")}
            className="p-0 w-1/6 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]"
          >
            VIEW ALL
          </button>
        </div>
      </div>
    </div>
  );
}
