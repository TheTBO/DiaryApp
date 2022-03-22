import { useSelector, useDispatch } from "react-redux";
import {
    addPerson,
    setCurrent,
    setDefault,
    setPeople,
} from "@/Redux/UserSlice";
import {
    FaCheckCircle,
    FaChevronDown,
    FaEdit,
    FaHeart,
    FaPlus,
    FaRegHeart,
    FaTrash,
} from "react-icons/fa";
import { useState } from "react";
import { get, post, delete as destroy, patch } from "axios";

export default function PersonSelect({ className }) {
    const dispatch = useDispatch();
    const [newPerson, setNewPerson] = useState("");
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(null);
    const selected = useSelector((state) => {
        return state.user.current;
    });
    const defaultPerson = useSelector((state) => {
        return state.user.default;
    });
    const people = useSelector((state) => {
        return state.user.people;
    });

    function submitNewUser() {
        if (newPerson && newPerson !== "") {
            if (selected) {
                post("/person", {
                    name: newPerson,
                }).then((response) => {
                    if (response.status === 200) {
                        const person = response.data;
                        if (person) dispatch(addPerson(person));
                    }
                });
            }
        }
    }

    function handleDestroy(person) {
        if (person) {
            destroy(`/person/${person.id}`).then(() => {
                if (selected)
                    post("/people", {
                        person: selected,
                    }).then((response) => {
                        if (response.status === 200) {
                            const people = response.data;
                            if (people)
                                dispatch(
                                    setPeople(
                                        people.map((person) => {
                                            return {
                                                ...person,
                                                edit: false,
                                            };
                                        })
                                    )
                                );
                        }
                    });
            });
        }
    }

    function handleSetDefault(person) {
        if (person) {
            patch("/people/default", {
                person,
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        dispatch(setDefault(person));
                    }
                })
                .then(() => {
                    get("/people").then((response) => {
                        if (response.status === 200) {
                            const people = response.data;
                            if (people) dispatch(setPeople(people));
                        }
                    });
                });
        }
    }

    function handleNameChange() {
        if (edit.name !== edit.new) {
            patch("/person", {
                person: edit.id,
                name: edit.new.trim(),
            }).then(() => {
                get("/people").then((response) => {
                    if (response.status === 200) {
                        const people = response.data;
                        if (people) dispatch(setPeople(people));
                    }
                });
            });
        }
        setEdit(null);
    }

    return (
        <div className={`relative ${className}`}>
            <div
                className={"bg-slate-600 p-2 rounded hover:cursor-pointer"}
                onClick={() => setOpen(!open)}
            >
                {selected ? selected.name : people[0] && people[0].name}
                <FaChevronDown className="inline ml-4" />
            </div>
            <div
                className={`absolute top-full items-stretch rounded-md -right-32 -left-2 mt-2 z-40 shadow-lg overflow-hidden bg-slate-600 ${
                    open ? "" : "hidden"
                }`}
            >
                {people.map((person, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex flex-row items-center gap-1 ${
                                person.id === selected?.id ? "bg-slate-800" : ""
                            }`}
                        >
                            {edit && person.id === edit.id ? (
                                <div className="flex flex-row items-center p-1 justify-items-start grow">
                                    <input
                                        className="p-1 text-gray-600 rounded"
                                        value={edit.new}
                                        onChange={(e) =>
                                            setEdit({
                                                ...edit,
                                                new: e.target.value,
                                            })
                                        }
                                    ></input>
                                    <FaCheckCircle
                                        className="ml-2 hover:cursor-pointer"
                                        onClick={() => handleNameChange()}
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`pl-2 text-left grow ${
                                        person.id === selected?.id
                                            ? ""
                                            : "hover:cursor-pointer"
                                    }`}
                                    onClick={() => {
                                        if (person.id !== selected?.id) {
                                            dispatch(setCurrent(person));
                                            setOpen(false);
                                        }
                                    }}
                                >
                                    {person.name}
                                </div>
                            )}
                            <div className="flex flex-row pr-2">
                                {person.id === defaultPerson?.id ? (
                                    <FaHeart className="fill-red-400" />
                                ) : (
                                    <FaRegHeart
                                        onClick={() => handleSetDefault(person)}
                                        className="hover:cursor-pointer"
                                    />
                                )}
                                <FaEdit
                                    className="ml-2 hover:cursor-pointer"
                                    onClick={() => {
                                        setEdit({
                                            ...person,
                                            new: person.name,
                                        });
                                    }}
                                />
                                <FaTrash
                                    className="ml-2 hover:cursor-pointer"
                                    onClick={() => handleDestroy(person)}
                                />
                            </div>
                        </div>
                    );
                })}
                <div className="flex flex-row items-center pr-1">
                    <input
                        className="w-full m-1 text-gray-600 rounded shrink"
                        type={"text"}
                        value={newPerson}
                        onChange={(e) => setNewPerson(e.target.value)}
                    ></input>
                    <FaPlus onClick={submitNewUser} />
                </div>
            </div>
        </div>
    );
}
