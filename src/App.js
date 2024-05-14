import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import Controls from './components/Controls';
import LengthControl from './components/LengthControl';
import Clock from './components/Clock';

const App = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isSession, setIsSession] = useState(true);
    const [timerLabel, setTimerLabel] = useState("Session");

    const beepAudio = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        setTimeLeft(sessionLength * 60);
    }, [sessionLength]);

    useEffect(() => {
        if (timeLeft === 0) {
            try {
                beepAudio.current.play();
                if (isSession) {
                    setTimerLabel("Break");
                    setTimeLeft(breakLength * 60);
                } else {
                    setTimerLabel("Session");
                    setTimeLeft(sessionLength * 60);
                }
                setIsSession(!isSession);
            } catch (error) {
                console.error("Error transitioning timer:", error);
            }
        }
    }, [timeLeft, isSession, breakLength, sessionLength]);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning]);

    const handleIncrement = (type) => {
        if (type === 'break') {
            if (breakLength < 60) {
                setBreakLength(prev => prev + 1);
            }
        } else {
            if (sessionLength < 60) {
                setSessionLength(prev => prev + 1);
            }
        }
    };

    const handleDecrement = (type) => {
        if (type === 'break') {
            if (breakLength > 1) {
                setBreakLength(prev => prev - 1);
            }
        } else {
            if (sessionLength > 1) {
                setSessionLength(prev => prev - 1);
            }
        }
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        console.log('Resetting...');
        setIsRunning(false);
        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft(25 * 60);
        setIsSession(true);
        setTimerLabel("Session");
        const beep = beepAudio.current;
        beep.pause();
        beep.currentTime = 0;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        console.log('Reset complete.');
    };

    return (
        <div className="App container text-center">
            <h1>25 + 5 Clock</h1>
            <div className="row">
                <LengthControl 
                    id="break" 
                    title="Break Length" 
                    length={breakLength} 
                    increment={() => handleIncrement('break')} 
                    decrement={() => handleDecrement('break')} 
                />
                <LengthControl 
                    id="session" 
                    title="Session Length" 
                    length={sessionLength} 
                    increment={() => handleIncrement('session')} 
                    decrement={() => handleDecrement('session')} 
                />
            </div>
            <Clock 
                label={timerLabel} 
                timeLeft={timeLeft} 
            />
            <Controls 
                startStop={handleStartStop} 
                reset={handleReset} 
                isRunning={isRunning} 
            />
            <audio id="beep" ref={beepAudio} src="https://www.soundjay.com/button/beep-07.wav" />
        </div>
    );
};

export default App;
