import { parseTime, dayToString } from "@/Logic/Calander";
import { useSelector, useDispatch } from "react-redux";
import EventIcon from "./EventIcon";
import { openEdit } from "@/Redux/FormSlice";

export default function Details() {
    const day = useSelector((state) => state.calender.day);
    const dispatch = useDispatch();

    return (
        <div className="h-full max-h-full overflow-hidden text-center">
            {day && (
                <>
                    <p>{dayToString(day)}</p>
                    <div className="flex flex-col items-center h-full max-h-full pb-8 overflow-y-auto">
                        {day.events.map((event) => {
                            return (
                                <div
                                    key={event.id}
                                    className="flex flex-row items-center justify-center gap-1 w-max"
                                >
                                    <h2>
                                        {parseTime(
                                            `${event.date} ${event.time}`
                                        )}
                                    </h2>
                                    <div
                                        className="flex flex-row gap-2 pl-2 border-l-2 hover:cursor-pointer"
                                        onClick={() =>
                                            dispatch(openEdit(event))
                                        }
                                    >
                                        <EventIcon type={event.type} />
                                        <p>{event.note}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
