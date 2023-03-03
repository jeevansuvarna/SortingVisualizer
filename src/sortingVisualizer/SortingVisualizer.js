import React, { useEffect, useState } from 'react'
import { getBubbleSort } from '../algorithm/bubblesort';
import { getInsertionSort } from '../algorithm/insertionSort';
import getMergeSort from '../algorithm/mergeSort';
import { getQuickSort } from '../algorithm/quickSort';
import './SortingVisualizer.css'
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

const complexities = {
    "merge": {
        time: "O(n*log(n))",
        space: "O(n)"
    },
    "quick": {
        time: "O(n*log(n))",
        space: "O(logn)",
    },
    "bubble": {
        time: "O(n^2)",
        space: "O(1)",
    },
    "insertion": {
        time: "O(n^2)",
        space: "O(1)",
    }
}


export const SortingVisualizer = () => {

    const [array, setArray] = useState([]);
    const [width, setWidth] = useState([]);

    const [userSettings, setUserSettings] = useState({
        arrayLength: 100,
        timer: 10,
    })
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        const screenWidth = window.screen.width / 2.5;
        setWidth(screenWidth / userSettings.arrayLength)

        resetArray();
    }, [userSettings.arrayLength])

    const resetArray = () => {
        let array = [];

        for (let i = 0; i < userSettings.arrayLength; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        setArray(array)
    }


    const controlAnimation = (animation) => {
        const timer = userSettings.timer;
        for (let i = 0; i < animation.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOne, barTwo, flag] = animation[i];
            if (flag !== "swap") {
                const barOneStyle = arrayBars[barOne].style;
                const barTwoStyle = arrayBars[barTwo].style;
                const color = flag === "comp1" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * timer);
            } else {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOne].style;
                    barOneStyle.height = `${barTwo}px`;
                }, i * timer);

            }
        }


    }
    const mergeSort = () => {

        let animation = getMergeSort(array);
        document.getElementById("time-complexity").innerHTML = "Time Complexity: " + complexities.merge.time;
        document.getElementById("space-complexity").innerHTML = "Space Complexity: " + complexities.merge.space;
        controlAnimation(animation)
    }

    const bubbleSort = () => {

        let animation = getBubbleSort(array);
        document.getElementById("time-complexity").innerHTML = "Time Complexity: " + complexities.bubble.time;
        document.getElementById("space-complexity").innerHTML = "Space Complexity: " + complexities.bubble.space;
        controlAnimation(animation)


    }

    const insertionSort = () => {

        const animation = getInsertionSort(array);
        document.getElementById("time-complexity").innerHTML = "Time Complexity: " + complexities.insertion.time;
        document.getElementById("space-complexity").innerHTML = "Space Complexity: " + complexities.insertion.space;
        controlAnimation(animation)


    }

    const quickSort = () => {

        const animation = getQuickSort(array);
        document.getElementById("time-complexity").innerHTML = "Time Complexity: " + complexities.quick.time;
        document.getElementById("space-complexity").innerHTML = "Space Complexity: " + complexities.quick.space;
        controlAnimation(animation)


    }
    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const handleTimer = (event) => {
        setUserSettings(prev => ({ ...userSettings, timer: event.target.value }))
    }
    const handleBar = (event) => {
        setUserSettings(prev => ({ ...userSettings, arrayLength: event.target.value }))
    }
    // const handleStop = () => {
    //     setUserSettings(prev => ({ ...userSettings, stop: !userSettings.stop }))
    // }
    return (
        <div className='container'>
            <h1>Sorting Visualizer</h1>

            <div className='header'>
                <div className='slider'>
                    <div>
                        <h4>Set Timer :</h4>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={userSettings.timer}
                            onChange={handleTimer}
                        />
                    </div>
                    <div>
                        <h4>Set No of Bar :</h4>
                        <input
                            type="range"
                            min="5"
                            max="200"
                            value={userSettings.arrayLength}
                            onChange={handleBar}
                        />
                    </div>

                </div>
                <div className='buttons'>
                    <button className="reset" onClick={() => resetArray()}>Generate New Array</button>
                    <button onClick={() => mergeSort()}>Merge Sort</button>
                    <button onClick={() => bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => insertionSort()}>Insertion Sort</button>
                    <button onClick={() => quickSort()}>Quick Sort</button>
                    {/* <button onClick={() => handleStop()}>STOP</button> */}

                </div>
            </div>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                            width: `${width}px`,
                        }}></div>
                ))}
            </div>
            <div className="complex">
                <h1 id='time-complexity'></h1>
                <h1 id='space-complexity'></h1>

            </div>

        </div >
    )
}
