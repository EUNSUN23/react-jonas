import {memo, useEffect, useState} from 'react';
import clickSound from './ClickSound.m4a';

function Calculator({workouts, allowSound}) {
    const [number, setNumber] = useState(workouts.at(0).numExercises);
    const [sets, setSets] = useState(3);
    const [speed, setSpeed] = useState(90);
    const [durationBreak, setDurationBreak] = useState(5);
    const [duration, setDuration] = useState(0);

    // durationBreak와 duration state 동기화하기 -> useEffect내에서 state기반 다른state업데이트는 렌더링 커밋을 일으키므로 지양해야하지만
    // 이벤트핸들러에서 처리하면 number, sets, speed, duration이벤트 핸들러에 각각 setDuration을 추가해서 코드가 늘어나므로 여기선 ok.
    useEffect(function () {
        console.log("setDuration effect");
        setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    }, [number, sets, speed, durationBreak]);

    // setDuration과 playSound를 별개의 useEffect로 분리 -> 한 useEffect당 하나의 effect만 해야하는 이유.
    useEffect(function () {
        const playSound = function () {
            if (!allowSound) return;
            const sound = new Audio(clickSound);
            sound.play();
        };
        playSound();
    },[duration, allowSound]); // duration은 effect함수내에서 사용하지 않지만 effect실행 위해 추가.

    // useEffect(function () {
    //     console.log(duration, sets);
    //     document.title = `Your ${number}-exercise workout`;
    // },[number]);

    // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
    const mins = Math.floor(duration);
    const seconds = (duration - mins) * 60;


    function handleInc() {
        setDuration(duration => Math.floor(duration) + 1);
    }

    function handleDec() {
        setDuration(duration => duration > 1 ? Math.ceil(duration) - 1 : 0);
    }

    return (
        <>
            <form>
                <div>
                    <label>Type of workout</label>
                    <select value={number} onChange={(e) => setNumber(+e.target.value)}>
                        {workouts.map((workout) => (
                            <option value={workout.numExercises} key={workout.name}>
                                {workout.name} ({workout.numExercises} exercises)
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>How many sets?</label>
                    <input
                        type='range'
                        min='1'
                        max='5'
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                    />
                    <span>{sets}</span>
                </div>
                <div>
                    <label>How fast are you?</label>
                    <input
                        type='range'
                        min='30'
                        max='180'
                        step='30'
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                    />
                    <span>{speed} sec/exercise</span>
                </div>
                <div>
                    <label>Break length</label>
                    <input
                        type='range'
                        min='1'
                        max='10'
                        value={durationBreak}
                        onChange={(e) => setDurationBreak(e.target.value)}
                    />
                    <span>{durationBreak} minutes/break</span>
                </div>
            </form>
            <section>
                <button onClick={handleDec}>–</button>
                <p>
                    {mins < 10 && '0'}
                    {mins}:{seconds < 10 && '0'}
                    {seconds}
                </p>
                <button onClick={handleInc}>+</button>
            </section>
        </>
    );
}

export default memo(Calculator);
