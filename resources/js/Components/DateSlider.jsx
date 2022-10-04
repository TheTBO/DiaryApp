import { getMonthString } from "@/Logic/Calander";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    incrementMonth,
    decrementMonth,
    incrementYear,
    decrementYear,
} from "@/Redux/CalenderSlice";

export default function DateSlider() {
    const month = useSelector((state) => state.calender.month);
    const year = useSelector((state) => state.calender.year);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="flex flex-row justify-center">
                <div
                    className="p-2 hover:cursor-pointer"
                    onClick={() => dispatch(decrementMonth())}
                >
                    <FaChevronLeft />
                </div>
                <p className="w-1/4 text-center">
                    {getMonthString({ year, month })}
                </p>
                <div
                    className="p-2 hover:cursor-pointer"
                    onClick={() => dispatch(incrementMonth())}
                >
                    <FaChevronRight />
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <div
                    className="p-2 hover:cursor-pointer"
                    onClick={() => dispatch(decrementYear())}
                >
                    <FaChevronLeft />
                </div>
                <p className="w-1/4 text-center">{year}</p>
                <div
                    className="p-2 hover:cursor-pointer"
                    onClick={() => dispatch(incrementYear())}
                >
                    <FaChevronRight />
                </div>
            </div>
        </div>
    );
}
