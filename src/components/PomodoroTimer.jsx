import React from 'react';

const PomodoroTimer = ({ timer }) => {
    return (
        <div className="pomodoro-timer">
            <h2>Pomodoro Timer: {timer.mode}</h2>
            <p>Time Left: {Math.floor(timer.timeLeft / 60)}:{timer.timeLeft % 60 < 10 ? '0' : ''}{timer.timeLeft % 60}</p>
        </div>
    );
};

export default PomodoroTimer;