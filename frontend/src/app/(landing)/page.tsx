"use client";

import { Heading } from "./_components/header";
import { AccountTable } from "./_components/user-table";

function LandingPage() {
  return (
    <>
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 pt-20">
          <Heading />
        </div>
        {/* Centering the table */}
        <div className="flex justify-center">
          <div className="w-1/2">
            <AccountTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
