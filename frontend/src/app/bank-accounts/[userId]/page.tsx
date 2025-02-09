import React, { useState, useEffect } from "react";
import BankAccountPage from "./_components/bank";
import Chatbot from "./_components/chatbot";
import TransactionsPage from "./_components/transactions";
import axios from "axios";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Truist Bank Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BankAccountPage />
          <TransactionsPage />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6">
          
        </div>
      </div>
    </div>
  );
}
