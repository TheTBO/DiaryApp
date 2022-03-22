import { useDispatch } from "react-redux";
import { setDay } from "@/Redux/CalenderSlice";

export default function Day({ date }) {
    const dispatch = useDispatch();

    function clickHandler() {
        dispatch(setDay({ ...date, selected: true }));
    }

    return (
        <td
            className={`
            p-1  box-border hover:cursor-pointer 
            ${
                date.selected === true
                    ? "text-zinc-50"
                    : "dark:hover:bg-slate-700 hover:bg-slate-400"
            }
            ${date.class === "last" ? "dark:bg-cyan-900" : ""}
            ${date.class === "next" ? "dark:bg-sky-900" : ""}
            `}
            id={date.id}
            onClick={clickHandler}
        >
            <div
                className={`flex flex-row gap-1 items-center justify-center m-auto w-12 h-12 relative
                ${
                    date.selected === true
                        ? 'bg-indigo-900 relative before:content-[""] before:absolute  before:-inset-1 before:ring-4 before:ring-indigo-900'
                        : ""
                }
                ${
                    date.events.length > 0
                        ? "font-bold"
                        : "text-gray-600 dark:text-gray-200"
                }`}
            >
                {date.day}
            </div>
        </td>
    );
}
