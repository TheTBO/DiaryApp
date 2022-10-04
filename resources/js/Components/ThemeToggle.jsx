import { FaSun, FaMoon } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { darkOn, darkOff } from "@/Redux/DarkSlice";
import { useEffect } from "react";

export default function ThemeToggle({ className }) {
    const dark = useSelector((state) => state.dark.value);
    const dispatch = useDispatch();

    function toggle(e) {
        if (e) dispatch(darkOn());
        else dispatch(darkOff());
    }

    useEffect(() => {
        if (dark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    });

    return (
        <div className={`flex flex-row items-center gap-2 ${className}`}>
            <FaSun className="w-3 h-3 sun dark:fill-zinc-50 fill-slate-800" />
            <Switch
                checked={dark}
                onChange={toggle}
                className={`${
                    dark ? "bg-slate-600" : "bg-gray-200"
                } relative inline-flex items-center h-6 rounded-full w-11`}
            >
                <span
                    aria-hidden="true"
                    className={`${
                        dark ? "translate-x-6" : "translate-x-1 bg-gray-800"
                    }
                        pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                />
            </Switch>
            <FaMoon className="w-3 h-3 moon dark:fill-zinc-50 fill-slate-800" />
        </div>
    );
}
