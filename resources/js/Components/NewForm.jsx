import { FaTimes } from "react-icons/fa";
import { useForm } from "@inertiajs/inertia-react";
import EventIcon from "./EventIcon";
import TypeSelect from "@/Components/TypeSelect";
import { closeNew } from "@/Redux/FormSlice";
import { setEvents } from "@/Redux/CalenderSlice";
import { useDispatch } from "react-redux";

export default function NewForm() {
    const dispatch = useDispatch();

    const { data, setData, post, processing, errors } = useForm({
        title: null,
        note: null,
        type: null,
        time: null,
        date: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (
            data.title !== null &&
            data.time !== null &&
            data.date !== null &&
            data.type !== null
        ) {
            post("/calender", {
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
    }

    function handleAbort() {
        setData({
            title: null,
            note: null,
            type: null,
            time: null,
            date: null,
        });
        dispatch(closeNew());
    }

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center dark:text-zinc-50 drop-shadow-xl">
            <form
                className="relative grid items-start justify-start grid-cols-1 gap-2 px-4 py-10 bg-gray-100 border-2 grid-cols-max dark:bg-slate-800 dark:border-slate-400 rounded-2xl"
                onSubmit={handleSubmit}
            >
                <h2 className="col-span-2 mb-2 font-bold justify-self-center">
                    New Event
                </h2>

                <label htmlFor="title" className="flex flex-row gap-2">
                    <p>Title</p>
                </label>
                <input
                    className="rounded form-input dark:bg-slate-500"
                    id="title"
                    type={"text"}
                    onChange={(e) => setData("title", e.target.value)}
                ></input>

                <label htmlFor="note" className="flex flex-row gap-2">
                    <p>Note</p>
                </label>
                <input
                    className="rounded form-input dark:bg-slate-500"
                    id="note"
                    type={"text"}
                    onChange={(e) => setData("note", e.target.value)}
                ></input>

                <label htmlFor="type" className="flex flex-row gap-2">
                    <p>Type</p>
                </label>
                <TypeSelect
                    id="type"
                    title="type"
                    onChange={(value) => setData("type", value)}
                >
                    <EventIcon type={1} value={1} />
                    <EventIcon type={2} value={2} />
                    <EventIcon type={3} value={3} />
                </TypeSelect>

                <label htmlFor="time" className="flex flex-row gap-2">
                    <p>Time</p>
                </label>
                <input
                    className="rounded form-input dark:bg-slate-500"
                    id="time"
                    type={"time"}
                    onChange={(e) => setData("time", e.target.value)}
                ></input>

                <label htmlFor="time" className="flex flex-row gap-2">
                    <p>Date</p>
                </label>
                <input
                    className="rounded form-input dark:bg-slate-500"
                    id="date"
                    type={"date"}
                    onChange={(e) => setData("date", e.target.value)}
                ></input>

                <button
                    type="submit"
                    disable={processing}
                    className="col-span-2 p-1 mt-2 bg-pink-800 border border-pink-200 rounded w-max justify-self-center"
                >
                    Create
                </button>
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
