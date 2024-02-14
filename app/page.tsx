"use client";
import { useState } from "react";

enum State {
  IDLE,
  ROLLING,
  ROLLED,
}

class Die {
  constructor(dice = 6, roll = rand(6)) {
    this.dice = dice;
    this.currentRoll = roll;
  }

  dice: number;
  currentRoll: number;

  roll() {
    let newRoll = rand(this.dice);
    while (newRoll == this.currentRoll) {
      newRoll = rand(this.dice);
    }
    this.currentRoll = newRoll;
  }
}

function rand(n: number) {
  return Math.floor(Math.random() * n);
}

export default function Home() {
  const emojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  const [state, setState] = useState(State.IDLE);
  const [dice, setDice] = useState([new Die()]);

  function handleRollClick() {
    setState(State.ROLLING);
    let previousRoll = -1;
    const timer = setInterval(() => {
      dice.forEach((die) => {
        die.roll();
      });
      setDice([...dice]);
    }, 100);

    setTimeout(() => {
      clearInterval(timer);
      setState(State.ROLLED);
    }, 1000);
  }

  function handleRemoveDie() {
    setDice(dice.slice(0, -1));
  }

  function handleAddDie() {
    setDice([...dice, new Die()]);
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
        <button
          disabled={dice.length === 1 || state === State.ROLLING}
          className="bg-amber-200 rounded p-2 disabled:bg-slate-200"
          onClick={handleRemoveDie}
        >
          Remove dice
        </button>
        <button
          disabled={state === State.ROLLING}
          className="bg-amber-200 rounded p-2 disabled:bg-slate-200"
          onClick={handleAddDie}
        >
          Add dice
        </button>
        {state === State.IDLE && (
          <ul className="flex gap-1 text-9xl">
            {emojis.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        {dice.map(
          (die, i) =>
            state !== State.IDLE && (
              <div
                key={i}
                className={
                  state === State.ROLLING
                    ? "text-9xl text-yellow-500"
                    : "text-9xl text-green-500"
                }
              >
                {emojis[die.currentRoll]}
              </div>
            ),
        )}
      </div>
    </main>
  );
}
