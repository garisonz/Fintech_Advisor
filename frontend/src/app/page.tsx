'use client';
import { useEffect, useState } from 'react';
import { fetchHello } from '../services/api';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHello();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Message from Django: {message}</h1>
    </main>
  );
}