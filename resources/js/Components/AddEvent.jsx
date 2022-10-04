import { FaPlus } from "react-icons/fa";
import { openNew } from "@/Redux/FormSlice";
import { useDispatch } from "react-redux";

export default function AddEvent() {
    const dispatch = useDispatch();

    return (
        <div
            className="absolute p-4 bg-pink-800 rounded-full bottom-10 right-10 hover:bg-pink-900 hover:cursor-pointer drop-shadow-lg"
            onClick={() => dispatch(openNew())}
        >
            <FaPlus className="text-zinc-50" />
        </div>
    );
}
