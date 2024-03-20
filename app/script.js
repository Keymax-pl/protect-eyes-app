import React, { useState, useMemo } from 'react';
import { render } from 'react-dom';

const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => {
    console.log("Czas:", time);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const formattedTime = useMemo(() => formatTime(time), [time]);

  const startTimer = () => {
    setTime(10);
    setStatus('work');
  
    setTimer(setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 0) {
          clearInterval(timer);
          if (status === 'work') {
            playBell();
            setStatus('rest');
            return 20;
          } else if (status === 'rest') {
            playBell();
            setStatus('work');
            return 10;
          }
        }
        return prevTime - 1;
      });
    }, 1000));
  }

  const stopTimer = () => {
    clearInterval(timer);
    setTime(0);
    setStatus('off');
  }
  
  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };
  

  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      { status === 'work' && (<img src="./images/work.png" />)}
      { status === 'rest' && (<img src="./images/rest.png" />)}
      { status !== 'off' && (
        <div className="timer">
          {formattedTime}
        </div>
      )}
      { status === 'off' && (<button className="btn" onClick={startTimer}>Start</button>)}
      { status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
      <button className="btn btn-close" onClick={window.close}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
