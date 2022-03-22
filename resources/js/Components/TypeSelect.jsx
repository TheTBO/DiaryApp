import { useState, useRef, useEffect } from "react";
import { findDOMNode } from "react-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import EventIcon from "./EventIcon";

export default function TypeSelect({
    children,
    onChange,
    className,
    value: _value,
}) {
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(_value ? _value : 4);
    const select = useRef(null);
    const [focus, setFocus] = useState();

    useEffect(() => {
        setValue(_value);
    }, [_value]);

    function handleClick(value) {
        if (typeof value !== "undefined") {
            onChange(value);
            setValue(value);
            setExpanded(false);
        }
    }

    function handleFocus(e) {
        const parent = select.current.children[1];
        setExpanded(true);
        if (select.current === e.target) {
            setFocus([...parent.children].indexOf(parent.firstChild));
        }
    }

    function handleKeyPress(e) {
        if (e.code === "ArrowDown") {
            if (focus === children.length - 1) {
                setFocus(0);
            } else {
                setFocus(focus + 1);
            }
        } else if (e.code === "ArrowUp") {
            if (focus === 0) {
                setFocus(children.length - 1);
            } else {
                setFocus(focus - 1);
            }
        } else if (
            typeof focus !== "undefined" &&
            (e.code === "Enter" || e.code === "Space")
        ) {
            setValue(focus + 1);
            onChange(focus + 1);
            setExpanded(false);
        } else if (e.code === "Escape") {
            setExpanded(false);
        }
    }

    useEffect(() => {
        if (typeof focus !== "undefined") {
            findDOMNode(select.current.children[1].children[focus]).focus();
        }
    }, [focus]);

    return (
        <div
            ref={select}
            tabIndex={0}
            className={`relative w-4/5 ${
                typeof className !== "undefined" ? className : ""
            }`}
            onFocus={handleFocus}
            onBlur={() => setExpanded(false)}
            onKeyDown={handleKeyPress}
        >
            <div
                className="flex flex-row items-center"
                onClick={() => setExpanded(!expanded)}
            >
                <EventIcon type={value} />
                {expanded ? (
                    <FaAngleUp className="justify-self-end" />
                ) : (
                    <FaAngleDown className="justify-self-end" />
                )}
            </div>
            <div
                className={`absolute top-full right-0 left-0 dark:bg-slate-800 p-2 border-2 dark:border-slate-400 rounded ${
                    expanded ? "flex flex-col" : "hidden overflow-hidden"
                }`}
            >
                {children.map((child) => {
                    return (
                        <div
                            key={child.props.value}
                            value={child.props.value}
                            onClick={() => handleClick(child.props.value)}
                        >
                            {child}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
