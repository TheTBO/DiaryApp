import { useEffect } from "react";
import Day from "@/Components/Day";
import AddEvent from "@/Components/AddEvent";
import Details from "@/Components/Details";
import DateSlider from "@/Components/DateSlider";
import NewForm from "@/Components/NewForm";
import { post, get } from "axios";
import EditForm from "@/Components/EditForm";
import {
    getMonthDays,
    getDayEvents,
    incMonth,
    decMonth,
} from "@/Logic/Calander";
import Authenticated from "@/Layouts/Authenticated";
import { useSelector, useDispatch } from "react-redux";
import { addDay, setYear, setMonth, setEvents } from "@/Redux/CalenderSlice";
import { setUser, setPeople, setDefault, setCurrent } from "@/Redux/UserSlice";
import PersonSelect from "@/Components/PersonSelect";

export default function Calender({ auth }) {
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const COLS = 7;
    const ROWS = 5;

    const newForm = useSelector((state) => state.form.new);
    const editForm = useSelector((state) => state.form.edit);
    const days = useSelector((state) => state.calender.days);
    const year = useSelector((state) => state.calender.year);
    const month = useSelector((state) => state.calender.month);
    const day = useSelector((state) => state.calender.day);
    const events = useSelector((state) => state.calender.events);
    const person = useSelector((state) => state.user.current);
    const dispatch = useDispatch();

    useEffect(() => {
        const date = new Date();
        dispatch(setYear(date.getFullYear()));
        dispatch(setMonth(date.getMonth()));

        dispatch(setUser(auth.user));

        get("/people").then((response) => {
            if (response.status === 200) {
                const people = response.data;
                if (people) dispatch(setPeople(people));
            }
        });
        post("/people/default").then((response) => {
            if (response.status === 200) {
                const defaultPerson = response.data;
                if (defaultPerson) {
                    dispatch(setDefault(defaultPerson));
                    dispatch(setCurrent(defaultPerson));
                }
            }
        });
    }, []);

    useEffect(() => {
        if (person && person.hasOwnProperty("id")) {
            post("/events", {
                person: person.id,
                month: month,
                year: year,
            }).then((response) => {
                const events = response.data;
                if (response.status === 200 && events) {
                    dispatch(setEvents(events));
                }
            });
        }
    }, [month, year, person]);

    function populateDays() {
        const { month: lastMonth, year: lastYear } = decMonth({ month, year });
        const { month: nextMonth, year: nextYear } = incMonth({ month, year });

        const monthDays = getMonthDays(year, month);
        const lastMonthDays = getMonthDays(year, lastMonth);

        const date = new Date(year, month, 1);
        const monthStart = date.getDay();

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                const n = COLS * i + j;

                let d,
                    m = month,
                    y = year,
                    c = "current";

                if (n <= monthStart) {
                    d = lastMonthDays - monthStart + n;
                    m = lastMonth;
                    y = lastYear;
                    c = "last";
                } else if (n <= monthDays) {
                    d = n - monthStart;
                } else {
                    d = n - monthDays;
                    m = nextMonth;
                    y = nextYear;
                    c = "next";
                }

                dispatch(
                    addDay({
                        day: d,
                        month: m,
                        year: y,
                        id: n,
                        week: i,
                        dayOfWeek: j,
                        class: c,
                        selected: false,
                        events: getDayEvents(events, y, m, d),
                    })
                );
            }
        }
    }

    useEffect(() => {
        populateDays();
    }, [year, month, events]);

    return (
        <Authenticated auth={auth}>
            <div className="relative flex flex-col h-full p-2 overflow-hidden calender">
                <header className="flex-col items-center justify-center flex-none fllex">
                    <div className="flex flex-col gap-1 text-center">
                        <PersonSelect className={"w-max ml-4"} />
                        <DateSlider
                            date={{ year, month }}
                            updateYear={(year) => {
                                setYear(year);
                                setSelected(null);
                            }}
                            updateMonth={(month) => {
                                setMonth(month);
                                setSelected(null);
                            }}
                        />
                    </div>
                </header>
                <main className="self-center flex-none w-11/12 my-2">
                    <table className="box-border w-full text-center table-auto">
                        <thead>
                            <tr>
                                {DAYS.map((element) => {
                                    return <th key={element}>{element}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        {row.map((element) => {
                                            return (
                                                <Day
                                                    key={element.id}
                                                    date={element}
                                                />
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </main>
                <footer className="flex flex-col overflow-hidden shrink">
                    {day !== null && <Details />}
                    {newForm && <NewForm />}
                    {editForm && <EditForm />}
                    <AddEvent handleClick={() => setUsingForm(true)} />
                </footer>
            </div>
        </Authenticated>
    );
}
