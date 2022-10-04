import { parseInt } from "lodash";
import { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function TimeSelect({ value, onChange, className, id }) {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const hoursRef = useRef(null);
    const minutesRef = useRef(null);

    function parseTime(time) {
        let hrs, mins;

        if (typeof time !== "undefined" && time !== "") {
            hrs = time.match("(^.[0-9])");
            mins = time.match("(.[0-9]$)");
        }

        return {
            hours: hrs && hrs.length ? parseInt(hrs[0]) : 0,
            minutes: mins && mins.length ? parseInt(mins[0]) : 0,
        };
    }

    useEffect(() => {
        const { minutes, hours } = parseTime(value);
        setHours(hours);
        setMinutes(minutes);
    }, [value]);

    function handleHoursChange(e) {
        const value = e.target.value !== "" ? parseInt(e.target.value) : 0;
        if (value <= parseInt(e.target.max)) {
            setHours(value);
        }
    }

    function handleMinutesChange(e) {
        const value = e.target.value !== "" ? parseInt(e.target.value) : 0;
        console.log(value);
        if (
            value <= parseInt(e.target.max) &&
            value >= parseInt(e.target.min)
        ) {
            setMinutes(value);
        }
    }

    useEffect(() => {
        onChange(
            `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}`
        );
    }, [hours, minutes]);

    return (
        <div id={id} className={`flex flex-row gap-1 ${className}`}>
            <div className="flex flex-col items-center justify-center w-12">
                <div className="w-full rounded-t bg-gradient-to-b from-gray-600 to-gray-500 hover:cursor-pointer">
                    <FaChevronUp
                        className="w-full"
                        onClick={() => {
                            const value = parseInt(hoursRef.current.value);
                            if (value < parseInt(hoursRef.current.max)) {
                                setHours(value + 1);
                            }
                        }}
                    />
                </div>
                <input
                    className="w-full text-center bg-transparent dark:border-zinc-50"
                    type={"number"}
                    ref={hoursRef}
                    min={0}
                    max={24}
                    value={hours}
                    onChange={handleHoursChange}
                ></input>
                <div className="w-full rounded-b bg-gradient-to-t from-gray-600 to-gray-500 hover:cursor-pointer">
                    <FaChevronDown
                        className="w-full"
                        onClick={() => {
                            const value = parseInt(hoursRef.current.value);
                            if (value > parseInt(hoursRef.current.min)) {
                                setHours(value - 1);
                            }
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-12">
                <div className="w-full rounded-t bg-gradient-to-b from-gray-600 to-gray-500 hover:cursor-pointer">
                    <FaChevronUp
                        className="w-full"
                        onClick={() => {
                            const value = parseInt(minutesRef.current.value);
                            if (value < parseInt(minutesRef.current.max)) {
                                setMinutes(value + 1);
                            }
                        }}
                    />
                </div>
                <input
                    className="w-full text-center bg-transparent dark:border-zinc-50"
                    type={"number"}
                    ref={minutesRef}
                    min={0}
                    max={60}
                    value={minutes}
                    onChange={handleMinutesChange}
                ></input>
                <div className="w-full rounded-b bg-gradient-to-t from-gray-600 to-gray-500 hover:cursor-pointer">
                    <FaChevronDown
                        className="w-full"
                        onClick={() => {
                            const value = parseInt(minutesRef.current.value);
                            if (value > parseInt(minutesRef.current.min)) {
                                setMinutes(value - 1);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
