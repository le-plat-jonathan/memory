import './Player.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';

function SoundPlayer() {
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [sourceNode, setSourceNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pausedAt, setPausedAt] = useState(null); 
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(audioCtx);

    fetch('src/assets/Hearthstone Main Title.mp3')
      .then(response => {
        setCurrentSong('Hearthstone Main Title.mp3');
        return response.arrayBuffer();
      })
      .then(buffer => audioCtx.decodeAudioData(buffer))
      .then(decodedData => setAudioBuffer(decodedData));

    return () => {
      audioCtx.close();
    };
  }, []);

  useEffect(() => {
    if (sourceNode) {
      sourceNode.onended = () => {
        setIsPlaying(false);
        setPausedAt(null);
      };
    }
  }, [sourceNode]);

  const togglePlay = () => {
    if (!audioContext || !audioBuffer) return;

    if (!isPlaying) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.loop = true;
      const startTime = pausedAt !== null ? pausedAt : 0;
      source.start(0, startTime);
      setSourceNode(source);
      setIsPlaying(true);
      updateProgress(source, startTime);
    } else {
      sourceNode.stop();
      setPausedAt(audioContext.currentTime - (progress * sourceNode.buffer.duration / 100));
      setIsPlaying(false);
    }
  };

  const stopSound = () => {
    if (sourceNode) {
      sourceNode.stop();
      setIsPlaying(false);
      setProgress(0);
      setPausedAt(null);
    }
  };

  const updateProgress = (source, startTime) => {
    const intervalId = setInterval(() => {
      if (source && isPlaying) {
        const currentTime = audioContext.currentTime - startTime;
        const duration = source.buffer.duration;
        const currentProgress = (currentTime / duration) * 100;
        setProgress(currentProgress);
      }
    }, 100);
    return () => clearInterval(intervalId);
  };

  const handleChangeProgress = (e) => {
    if (sourceNode) {
      const newTime = (e.target.value / 100) * sourceNode.buffer.duration;
      sourceNode.stop();
      sourceNode.start(0, newTime);
      updateProgress(sourceNode, newTime);
    }
  };

  return (
    <div className='playerStyle'>
      {currentSong && <p>{currentSong}</p>}
      <div className='ctrlBtns'>
        <button onClick={togglePlay}>
            {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
        </button>
        <button onClick={stopSound}>
            <FontAwesomeIcon icon={faStop} />
        </button>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleChangeProgress}
        style={{ width: '80%', display: 'block', margin: '0 auto' }}
      />
    </div>
  );
}

export default SoundPlayer;
