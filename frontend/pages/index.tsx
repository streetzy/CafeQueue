import React, { useEffect, useState } from "react";

function index() {
  return (
    <div className="h-screen w-screen">
      <div className=" h-full w-full flex flex-col justify-center items-center gap-5 py-5">
        {/* Viewing Panel */}
        <div className="w-9/12 h-5/6 border-[2px] rounded-3xl border-[#38211e] flex flex-row overflow-hidden shadow-[0_0_8px_#301d1e]">
          {/* Preparing */}
          <div className="w-6/12 h-full border-r-[2px] border-[#38211e]">
            <div className="flex w-full h-1/6 border-b-[2px] border-[#38211e] justify-center items-center bg-[#5B3739]">
              <p className="text-4xl text-[#ecdfe0] font-bold leading-none [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
                PREPARING
              </p>
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
          <button className="border-r-[2px] border-[#38211e] p-0 w-1/4 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
            ADD LOCATION
          </button>
          {/* Add order */}
          <button className="border-r-[2px] border-[#38211e] p-0 w-1/4 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
            ADD ORDER
          </button>
          {/* Order prepared for pickup */}
          <button className="border-r-[2px] border-[#38211e] p-0 w-1/4 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
            ORDER PREPARED
          </button>
          <button className="p-0 w-1/4 bg-[#5B3739] text-[#ecdfe0] text-4xl font-bold [text-shadow:_0_1px_0_rgb(245_239_240_/_40%)]">
            ORDER PICKED UP
          </button>
        </div>
      </div>
    </div>
  );
}

export default index;
