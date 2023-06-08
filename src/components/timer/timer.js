import { useState, useEffect } from "react";

const Timer = () => {
    let [hours, setHours] = useState(0);
    let [minutes, setMinutes] = useState(0);
    let [seconds, setSeconds] = useState(0);
    let [isTimerRunning, setIsTimerRunning] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case "hours":
                setHours(value);
                break;
            case "minutes":
                setMinutes(value);
                break;
            case "seconds":
                setSeconds(value);
                break;
        }
    };

    const startTimer = () => {
        setIsTimerRunning(true);
    };

    const stopTimer = () => {
        setIsTimerRunning(false);
    };

    useEffect(() => {
        if (isTimerRunning) {
            const interval = setInterval(() => {
                if (seconds === 0) {
                    seconds = 59;
                    minutes--;
                }
                if (minutes === 0) {
                    minutes = 59;
                    hours--;
                }
                setSeconds(seconds - 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [isTimerRunning]);

    return (
        <div>
            <h1>Timer</h1>
            <div>
                <input
                    type="number"
                    name="hours"
                    value={hours}
                    onChange={handleChange}
                    placeholder="Hours"
                />
                :
                <input
                    type="number"
                    name="minutes"
                    value={minutes}
                    onChange={handleChange}
                    placeholder="Minutes"
                />
                :
                <input
                    type="number"
                    name="seconds"
                    value={seconds}
                    onChange={handleChange}
                    placeholder="Seconds"
                />
            </div>
            <button onClick={startTimer} disabled={!isTimerRunning}>Start</button>
            <button onClick={stopTimer} disabled={!isTimerRunning}>Stop</button>
        </div>
    );
};

export default Timer;