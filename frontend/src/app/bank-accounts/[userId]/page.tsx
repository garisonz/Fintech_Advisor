"use client";

import React from "react";
import BankAccountPage from "./_components/bank";
import TransactionsPage from "./_components/transactions";
import ChatInterface from "./_components/chatinterface";
import Nav from "./_components/nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Nav />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Financial Information */}
          <div className="space-y-6">
            <section>
              <BankAccountPage />
            </section>
            <section>
              <TransactionsPage />
            </section>
          </div>

          {/* Right Column - Chat Interface */}
          <div className="lg:pl-6 p-6">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
}