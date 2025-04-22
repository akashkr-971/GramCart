'use client';
import React from 'react';

const alerts = [
  '🚨 Emergency Alert: Heavy rains predicted in Maharashtra – Harvest suggestions for farmers',
  '📈 Cotton prices expected to rise 15% next week',
  '🌱 High-yield seeds now in stock',
  '🧵 Handmade shawls available – support local artisans!',
  '🍅 Tomato prices set to spike – buy early!',
  '🥛 Fresh cow milk now delivered daily!',
];

const speakAlert = (message: string): void => {
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
  }
};

export default function MarqueeAlert() {
  return (
    <div className="w-full z-50 bg-red-100 border-b border-red-300 overflow-hidden whitespace-nowrap h-12">
      <div className="animate-marquee inline-block min-w-full text-3xl">
        {alerts.concat(alerts).map((msg, i) => (
          <span key={i} onClick={() => speakAlert(msg)} className="inline-block mx-8 text-xl mr-10 text-red-800 font-medium">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
