import { FaUtensils, FaBed, FaPoo, FaQuestionCircle } from "react-icons/fa";

export default function EventIcon({ type, value, className, onClick }) {
    function getIcon(type) {
        switch (type) {
            case 1:
                return <FaPoo className="fill-zinc-50" />;
                break;
            case 2:
                return <FaUtensils className="fill-zinc-50" />;
                break;
            case 3:
                return <FaBed className="fill-zinc-50" />;
                break;
            default:
                return <FaQuestionCircle className="fill-zinc-50" />;
        }
    }

    function getColor(type) {
        switch (type) {
            case 1:
                return "bg-violet-800";
                break;
            case 2:
                return "bg-blue-800";
                break;
            case 3:
                return "bg-green-800";
                break;
            default:
                return "bg-red-800";
        }
    }

    return (
        <div
            onClick={onClick}
            value={`${value ? value : ""}`}
            className={`${getColor(
                type
            )} rounded-full p-1.5 my-0.5 w-max ${className}`}
        >
            {getIcon(type)}
        </div>
    );
}
