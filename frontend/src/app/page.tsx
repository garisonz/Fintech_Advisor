'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Message from Django: </h1>
    </main>
  );
}