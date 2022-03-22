import { useForm } from "@inertiajs/inertia-react";
import { useDispatch, useSelector } from "react-redux";
import { closeEdit } from "@/Redux/FormSlice";
import { useEffect } from "react";
import TypeSelect from "./TypeSelect";
import EventIcon from "./EventIcon";
import { FaTimes } from "react-icons/fa";
import { setEvents } from "@/Redux/CalenderSlice";
import TimeSelect from "./TimeSelect";
import { getTime } from "@/Logic/Calander";

export default function EditForm() {
    const dispatch = useDispatch();

    const event = useSelector((state) => state.form.event);

    const {
        data,
        setData,
        patch,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        title: null,
        note: null,
        type: null,
        time: null,
        date: null,
    });

    useEffect(() => {
        reset();
    }, []);

    function reset() {
        setData({
            title: event.title,
            note: event.note,
            type: event.type,
            time: getTime(event.time),
            date: event.date,
        });
    }

    function handleAbort() {
        setData({
            title: null,
            note: null,
            type: null,
            time: null,
            date: null,
        });
        dispatch(closeEdit());
    }

    function handleSubmit(e) {
        e.preventDefault();
        patch(`/calender/${event.id}`, {
            onSuccess: ({ props: { events } }) => {
                dispatch(setEvents(events));
                handleAbort();
            },
            onFinish: () => {
                if (errors && Object.keys(errors).length !== 0)
                    console.log(errors);
            },
        });
    }

    function handleDestroy(e) {
        e.preventDefault();
        destroy(`/calender/${event.id}`, {
            onSuccess: ({ props: { events } }) => {
                dispatch(setEvents(events));
                handleAbort();
            },
        });
    }

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center dark:text-zinc-50 drop-shadow-xl">
            <form
                className="relative grid items-start justify-start grid-cols-1 gap-2 px-4 py-10 bg-gray-100 border-2 grid-cols-max dark:bg-slate-800 dark:border-slate-400 rounded-2xl"
                onSubmit={handleSubmit}
            >
                <h2 className="col-span-3 mb-2 font-bold justify-self-center">
                    Edit Event
                </h2>

                <label htmlFor="title" className="flex flex-row gap-2">
                    <p>Title</p>
                </label>
                <input
                    className="col-span-2 rounded form-input dark:bg-slate-500"
                    id="title"
                    type={"text"}
                    value={data.title ? data.title : ""}
                    onChange={(e) => setData("title", e.target.value)}
                ></input>

                <label htmlFor="note" className="flex flex-row gap-2">
                    <p>Note</p>
                </label>
                <input
                    className="col-span-2 rounded form-input dark:bg-slate-500"
                    id="note"
                    type={"text"}
                    value={data.note ? data.note : ""}
                    onChange={(e) => setData("note", e.target.value)}
                ></input>

                <label htmlFor="type" className="flex flex-row gap-2">
                    <p>Type</p>
                </label>
                <TypeSelect
                    id="type"
                    title="type"
                    value={data.type ? data.type : 4}
                    className="col-span-2"
                    onChange={(value) => setData("type", value)}
                >
                    <EventIcon type={1} value={1} />
                    <EventIcon type={2} value={2} />
                    <EventIcon type={3} value={3} />
                </TypeSelect>

                <label htmlFor="time" className="flex flex-row gap-2">
                    <p>Time</p>
                </label>
                <TimeSelect
                    className="col-span-2 form-input "
                    id="time"
                    value={data.time ? data.time : ""}
                    onChange={(value) => setData("time", getTime(value))}
                ></TimeSelect>

                <label htmlFor="time" className="flex flex-row gap-2">
                    <p>Date</p>
                </label>
                <input
                    className="col-span-2 rounded form-input dark:bg-slate-500"
                    id="date"
                    type={"date"}
                    value={data.date ? data.date : ""}
                    onChange={(e) => setData("date", e.target.value)}
                ></input>

                <div className="flex flex-row justify-end col-span-3 gap-3">
                    <button
                        onClick={handleDestroy}
                        type="button"
                        disabled={processing}
                        className="w-20 p-1 mt-2 bg-pink-800 border border-pink-200 rounded text-zinc-50 justify-self-center"
                    >
                        Delete
                    </button>
                    <button
                        onClick={reset}
                        type="button"
                        disabled={processing}
                        className="w-20 p-1 mt-2 bg-pink-800 border border-pink-200 rounded text-zinc-50 justify-self-center"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-20 p-1 mt-2 bg-pink-800 border border-pink-200 rounded text-zinc-50 justify-self-center"
                    >
                        Edit
                    </button>
                </div>
                <button
                    className="absolute top-4 right-4"
                    onClick={handleAbort}
                >
                    <FaTimes />
                </button>
            </form>
        </div>
    );
}
