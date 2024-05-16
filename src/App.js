import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import Controls from './components/Controls';
import LengthControl from './components/LengthControl';
import Clock from './components/Clock';
import beepSound from './beep.mp3';

const BREAK_LENGTH = 5 * 60;
const SESSION_LENGTH = 25 * 60;
const MIN = 60;
const MAX = 60 * 60;
const INTERVAL = 60;

const App = () => {
    const [breakLength, setBreakLength] = useState(BREAK_LENGTH);
    const [sessionLength, setSessionLength] = useState(SESSION_LENGTH);
    const [displayState, setDisplayState] = useState({
        time: SESSION_LENGTH,
        timeType: "Session",
        timerRunning: false,
    });

    const beepAudio = useRef(null);

    useEffect(() => {
        let timerID;
        if (displayState.timerRunning) {
            timerID = setInterval(() => {
                setDisplayState(prev => {
                    if (prev.time === 0) {
                        playBeep();
                        return {
                            ...prev,
                            time: prev.timeType === 'Session' ? breakLength : sessionLength,
                            timeType: prev.timeType === 'Session' ? 'Break' : 'Session',
                        };
                    }
                    return { ...prev, time: prev.time - 1 };
                });
            }, 1000);
        }
        return () => clearInterval(timerID);
    }, [displayState.timerRunning, breakLength, sessionLength]);

    const changeBreakTime = (time) => {
        if (displayState.timerRunning) return;
        setBreakLength(time);
    };

    const changeSessionTime = (time) => {
        if (displayState.timerRunning) return;
        setSessionLength(time);
        setDisplayState(prev => ({
            ...prev,
            time: time,
            timeType: "Session",
            timerRunning: false,
        }));
    };

    const reset = () => {
        setBreakLength(BREAK_LENGTH);
        setSessionLength(SESSION_LENGTH);
        setDisplayState({
            time: SESSION_LENGTH,
            timeType: "Session",
            timerRunning: false,
        });
        const audio = beepAudio.current;
        audio.pause();
        audio.currentTime = 0;
    };

    const startStop = () => {
        setDisplayState(prev => ({
            ...prev,
            timerRunning: !prev.timerRunning,
        }));
    };

    const playBeep = () => {
        const audio = beepAudio.current;
        audio.currentTime = 0;
        audio.play();
        setTimeout(() => {
            if (!audio.paused) {
                audio.play();
            }
        }, 500);
    };

    return (
        <div className="App container text-center">
            <h1>25 + 5 Clock</h1>
            <div className="row">
                <LengthControl 
                    id="break" 
                    title="Break Length" 
                    length={breakLength / 60} 
                    increment={() => changeBreakTime(Math.min(breakLength + INTERVAL, MAX))} 
                    decrement={() => changeBreakTime(Math.max(breakLength - INTERVAL, MIN))} 
                />
                <LengthControl 
                    id="session" 
                    title="Session Length" 
                    length={sessionLength / 60} 
                    increment={() => changeSessionTime(Math.min(sessionLength + INTERVAL, MAX))} 
                    decrement={() => changeSessionTime(Math.max(sessionLength - INTERVAL, MIN))} 
                />
            </div>
            <Clock 
                label={displayState.timeType} 
                timeLeft={displayState.time} 
            />
            <Controls 
                startStop={startStop} 
                reset={reset} 
                isRunning={displayState.timerRunning} 
            />
            <audio id="beep" ref={beepAudio} src={beepSound} />
        </div>
    );
};

export default App;
