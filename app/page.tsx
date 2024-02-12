"use client";
import { useState } from "react";

enum State {
  IDLE,
  ROLLING,
  ROLLED,
}

export default function Home() {
  const emojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  const [state, setState] = useState(State.IDLE);
  const [roll, setRoll] = useState<number>(0);

  function getRoll() {
    return Math.floor(Math.random() * emojis.length);
  }

  function handleRollClick() {
    setState(State.ROLLING);
    let previousRoll = -1;
    const timer = setInterval(() => {
      let roll = getRoll();
      while (previousRoll === roll) {
        roll = getRoll();
      }
      setRoll(roll);
    }, 100);

    setTimeout(() => {
      clearInterval(timer);
      setState(State.ROLLED);
    }, 1000);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col justify-center items-center">
        <button
          disabled={state === State.ROLLING}
          className="bg-amber-200 rounded p-2 disabled:bg-slate-200"
          onClick={handleRollClick}
        >
          {state === State.ROLLING ? "Rolling..." : "Roll the dice!"}
        </button>
        {state === State.IDLE && (
          <ul className="flex gap-1 text-9xl">
            {emojis.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
        {state !== State.IDLE && (
          <div
            className={
              state === State.ROLLING
                ? "text-8xl text-yellow-500"
                : "text-9xl text-green-500"
            }
          >
            {emojis[roll]}
          </div>
        )}
      </div>
    </main>
  );
}
