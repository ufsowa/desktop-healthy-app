import React, { useEffect, useMemo, useState } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
//  const [workTime, restTime, timeInterval] = [1200, 20, 1000];
  const [workTime, restTime, timeInterval] = [80, 70, 100];  // test

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  useEffect(() => {
    if(status !== 'off' && time <= 0){
      setStatus(status => status === 'work' ? 'rest' : 'work');
      setTime(_ => status === 'work' ? restTime : workTime);
      playBell();
    }
  }, [status, time])

  const formatTime = (time) => {
    return (
      <div className="timer">
          {new Date(time*1000).toISOString().slice(14, 19)}
      </div>
      );
  };

  const renderTime = useMemo(() => formatTime(time), [time]);

  const startTimer = () => {
    setTime(workTime);
    setStatus('work');
    if(timer) return;
    setTimer(setInterval(() => {
      setTime(time => time - 1);
    }, timeInterval));
  }

  const stopTimer = () => {
    setTime(0);
    setStatus('off')
    setTimer(clearInterval(timer));
  };

  const closeApp = () => {
    window.close()
  }

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
      { status !== 'off' && renderTime}
      { status === 'off' && (<button className="btn" onClick={startTimer}>Start</button>)}
      { status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
