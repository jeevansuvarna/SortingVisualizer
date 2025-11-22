import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getBubbleSort } from '../algorithm/bubblesort';
import { getInsertionSort } from '../algorithm/insertionSort';
import getMergeSort from '../algorithm/mergeSort';
import { getQuickSort } from '../algorithm/quickSort';
import './SortingVisualizer.css';
import Select from 'react-select';
import portfolio from '../images/portfolio.png';

const PRIMARY_COLOR = 'var(--bar-color)';
const SECONDARY_COLOR = 'var(--bar-color-secondary)';

const complexities = {
  merge: {
    time: 'O(n*log(n))',
    space: 'O(n)',
  },
  quick: {
    time: 'O(n*log(n))',
    space: 'O(logn)',
  },
  bubble: {
    time: 'O(n^2)',
    space: 'O(1)',
  },
  insertion: {
    time: 'O(n^2)',
    space: 'O(1)',
  },
};

export const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [width, setWidth] = useState([]);
  const [maxRange, setMaxRange] = useState(60);

  const checkMobile = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    setMaxRange(isMobile ? 30 : 90);
  }, [setMaxRange]);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  const options = [
    { value: 'bubble', label: 'Bubble Sort' },
    // { value: 'selection', label: 'Selection Sort' },
    { value: 'insertion', label: 'Insertion Sort' },
    { value: 'merge', label: 'Merge Sort' },
    { value: 'quick', label: 'Quick Sort' },
  ];
  const timeoutsRef = useRef([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const [userSettings, setUserSettings] = useState({
    arrayLength: window.innerWidth <= 768 ? 10 : 90,
    timer: 5,
  });
  const [disable, setDisable] = useState(false);

  const resetArray = useCallback(() => {
    let array = [];
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    for (let i = 0; i < userSettings.arrayLength; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    setDisable(false);
    setArray(array);
  }, [userSettings.arrayLength]); // Include this!

  useEffect(() => {
    const screenWidth = window.screen.width / 2.5;
    setWidth(screenWidth / userSettings.arrayLength);

    resetArray();
  }, [userSettings.arrayLength, resetArray]);

  const controlAnimation = (animation) => {
    const timer = userSettings.timer;
    clearAllTimeouts(); // Clear any previously set timeouts
    setDisable(true);

    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOne, barTwo, flag] = animation[i];

      if (flag !== 'swap') {
        const timeoutId = setTimeout(() => {
          const barOneStyle = arrayBars[barOne].style;
          const barTwoStyle = arrayBars[barTwo].style;
          const isComparing = flag === 'comp1';
          const color = isComparing ? SECONDARY_COLOR : PRIMARY_COLOR;
          const glow = isComparing
            ? '0 0 15px rgba(250, 204, 21, 0.8), 0 0 30px rgba(250, 204, 21, 0.4)'
            : '0 0 5px rgba(78, 143, 250, 0.2)';
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          barOneStyle.boxShadow = glow;
          barTwoStyle.boxShadow = glow;
        }, i * timer * 50);
        timeoutsRef.current.push(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          const barOneStyle = arrayBars[barOne].style;
          barOneStyle.height = `${barTwo}px`;
        }, i * timer * 50 );
        timeoutsRef.current.push(timeoutId);
      }
    }

    const finishTimeout = setTimeout(() => {
      setDisable(false);
    }, animation.length * timer);
    timeoutsRef.current.push(finishTimeout);
  };
  const mergeSort = () => {
    const clonedArray = [...array]; // don't pass live array
    const animation = getMergeSort(clonedArray);
    document.getElementById('time-complexity').innerHTML =
      'Time Complexity: ' + complexities.merge.time;
    document.getElementById('space-complexity').innerHTML =
      'Space Complexity: ' + complexities.merge.space;
    controlAnimation(animation);
  };

  const bubbleSort = () => {
    const clonedArray = [...array];
    const animation = getBubbleSort(clonedArray);
    document.getElementById('time-complexity').innerHTML =
      'Time Complexity: ' + complexities.bubble.time;
    document.getElementById('space-complexity').innerHTML =
      'Space Complexity: ' + complexities.bubble.space;
    controlAnimation(animation);
  };

  const insertionSort = () => {
    const clonedArray = [...array];
    const animation = getInsertionSort(clonedArray);
    document.getElementById('time-complexity').innerHTML =
      'Time Complexity: ' + complexities.insertion.time;
    document.getElementById('space-complexity').innerHTML =
      'Space Complexity: ' + complexities.insertion.space;
    controlAnimation(animation);
  };

  const quickSort = () => {
    const clonedArray = [...array];
    const animation = getQuickSort(clonedArray);
    document.getElementById('time-complexity').innerHTML =
      'Time Complexity: ' + complexities.quick.time;
    document.getElementById('space-complexity').innerHTML =
      'Space Complexity: ' + complexities.quick.space;
    controlAnimation(animation);
  };
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const handleTimer = (event) => {
    setUserSettings((prev) => ({ ...userSettings, timer: event.target.value }));
  };
  const handleBar = (event) => {
    setUserSettings((prev) => ({
      ...userSettings,
      arrayLength: event.target.value,
    }));
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#1E293B',
      borderColor: state.isFocused ? '#22D3EE' : '#334155',
      boxShadow: state.isFocused ? '0 0 0 1px #22D3EE' : 'none',
      '&:hover': {
        borderColor: '#22D3EE',
      },
      maxWidth: '300px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1E293B',
      color: 'white',
      maxWidth: '300px',
      borderRadius: '8px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#22D3EE'
        : state.isFocused
        ? '#334155'
        : '#1E293B',
      color: state.isSelected ? '#0F172A' : 'white',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#94A3B8',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  const functionObj = {
    bubble: bubbleSort,
    insertion: insertionSort,
    merge: mergeSort,
    quick: quickSort,
  };
  return (
    <>
      <div className='sorting-container'>
        <h1>Sorting Algorithm Visualizer</h1>
        <div className='main-layout'>
          <div className='top-container'>
            <div className='left-container'>
              <label for='algorithm' class='dropdown-label'>
                Algorithm
              </label>
              <Select
                options={options}
                styles={customStyles}
                defaultValue={options[0]}
                onChange={handleChange}
                isDisabled={disable}
              />
              <div className='buttons'>
                <button
                  className='start-btn'
                  onClick={() => {
                    functionObj[selectedOption.value]();
                  }}
                  disabled={disable}
                >
                  Start
                </button>
                <button className='generate-btn' onClick={() => resetArray()}>
                  Reset
                </button>
              </div>
            </div>
            <div className='middle-container'>
              <div className='complex'>
                <p id='time-complexity'></p>
                <p id='space-complexity'></p>
              </div>
            </div>
            <div className='right-container'>
              <div class='slider-wrapper'>
                <label for='arraySize' class='slider-label'>
                  Array Size:{' '}
                  <span id='arrayValue'>{userSettings?.arrayLength}</span>
                </label>
                <input
                  type='range'
                  min='1'
                  max={maxRange}
                  value={userSettings.arrayLength}
                  onChange={handleBar}
                  className='slider-input'
                  disabled={disable}
                />
              </div>
              <div class='slider-wrapper'>
                <label for='arraySize' class='slider-label'>
                  Set Timer : <span id='arrayValue'>{userSettings?.timer}</span>
                </label>
                <input
                  type='range'
                  min='1'
                  max='100'
                  value={userSettings.timer}
                  onChange={handleTimer}
                  className='slider-input'
                  disabled={disable}
                />
              </div>
            </div>
          </div>
          <div className='botton-container'>
            <div className='array-container'>
              {array.map((value, idx) => (
                <div
                  className='array-bar'
                  key={idx}
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${value}px`,
                    width: `${width}px`,
                    animation: `barGrow 0.4s ease-out ${idx * 0.01}s both`,
                    transformOrigin: 'bottom',
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <a
          href='https://jeevan-suvarna.netlify.app/'
          target='_blank'
          rel='noreferrer'
        >
          <img src={portfolio} alt='portfolio' className='portfolio_img' />
        </a>
      </div>
    </>
  );
};
