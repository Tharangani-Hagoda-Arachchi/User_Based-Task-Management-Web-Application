import React from "react";
import { FaTimes } from "react-icons/fa";

export const TaskDetail = ({ task, isOpen, onClose }) => {
    if (!isOpen || !task) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                    <FaTimes size={22} />
                </button>

                <h2 className="text-2xl font-bold text-purple-900 mb-5"> Task Details</h2>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm text-gray-500"> Title</h3>
                        <p className="text-lg font-semibold"> {task.title}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-500">Description</h3>
                        <p className="text-gray-700"> {task.description} </p>
                    </div>
                    <div className="flex gap-3">
                        <div>
                            <h3 className="text-sm text-gray-500"> Priority </h3>
                            <span
                                className={`
                                inline-block px-3 py-1 rounded-full text-sm mt-1
                                ${task.priority === "high"
                                        ? "bg-red-100 text-red-700"
                                        : task.priority === "medium"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-700"
                                    }
                                `}
                            >
                                {task.priority}
                            </span>

                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Status</h3>
                            <span
                                className={`
                                inline-block px-3 py-1 rounded-full text-sm mt-1
                                ${task.status === "completed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-blue-100 text-blue-700"
                                    }
                                `}
                            >
                                {task.status}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm text-gray-500">  Due Date </h3>
                        <p className="text-gray-700">
                            {
                                task.dueDate
                                    ?
                                    new Date(task.dueDate).toLocaleString(
                                        "en-US",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        }
                                    )
                                    :
                                    "No due date"
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
