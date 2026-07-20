import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask, updaeteStatusOfTask, getTasksById } from "../features/task/taskSlice.js";
import AddTask from "./AddTask.jsx";
import { TaskDetail } from "./TaskDetail.jsx";
import UpdateTask from "./UpdateTask.jsx";

const TaskList = () => {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const [showDetails, setShowDetails] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editTask, setEditTask] = useState(null);

    const { tasks, loading } = useSelector(
        (state) => state.task
    );

    const [filter, setFilter] = useState("all");

    //paging state
    const [currentPage, setCurrentPage] = useState(1);
    const taskPerPage = 5;

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    //filter tasks
    const filteredTasks = tasks.filter((task) => {
        if (filter === "all") {
            return true;
        }
        return task.status === filter;
    });

    //pagination
    const totalPages = Math.ceil(filteredTasks.length / taskPerPage);
    const startIndex = (currentPage - 1) * taskPerPage;
    const endIndex = startIndex + taskPerPage;
    const currentTasks = filteredTasks.slice(startIndex, endIndex)
    const handleFilter = (value) => {
        setFilter(value);
        setCurrentPage(1);
    }

    //delete handler
    const handleDelete = (taskId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (confirmDelete) {
            dispatch(deleteTask(taskId));
        }

    };

    //status change handler
    const handleStatusChange = (task) => {

        const newStatus =
            task.status === "pending"
                ? "completed"
                : "pending";

        dispatch(
            updaeteStatusOfTask({
                taskId: task._id,
                status: newStatus
            })
        );

    };

    //view single task 
    const handleViewMore = async (taskId) => {
        const result = await dispatch(getTasksById(taskId));

        if (result.payload) {
            setSelectedTask(result.payload.task);
            setShowDetails(true);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-5 mt-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
                <h2 className="text-2xl font-bold text-gray-800"> My Tasks</h2>
                <button onClick={() => setIsOpen(true)} className="bg-purple-900 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition">
                    + New Task
                </button>
            </div>

            {/* Filter Buttons */}

            <div className="flex gap-3 mb-5">
                <button
                    onClick={() => setFilter("all")}
                    className={`${filter === "all" ? "bg-purple-950 text-white" : "bg-gray-200"} px-4 py-1 rounded-2xl`}
                >
                    All
                </button>

                <button
                    onClick={() => setFilter("pending")}
                    className={`${filter === "pending" ? "bg-purple-950 text-white" : "bg-gray-200"} px-4 py-1 rounded-2xl`}
                >
                    Pending
                </button>

                <button
                    onClick={() => setFilter("completed")}
                    className={`${filter === "completed" ? "bg-purple-950 text-white" : "bg-gray-200"} px-4 py-1 rounded-2xl`}
                >
                    Completed
                </button>

            </div>

            {/* Task List */}
            {
                loading ? (
                    <h2 className="text-lg">Loading tasks...</h2>
                ) : filteredTasks.length === 0 ? (
                    <h2 className="text-gray-500">No tasks found</h2>
                ) : (

                    <div className="space-y-4">
                        {
                            currentTasks.map((task) => (
                                <div key={task._id} className="border border-gray-300 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:shadow-md transition">
                                    <div className="flex-1">
                                        <h3 className="text-m font-semibold text-gray-800"> {task.title}</h3>

                                        <div className="flex flex-wrap items-center gap-3 mt-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${task.priority === "high" ? "bg-red-100 text-red-700" : task.priority === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                                                {task.priority}
                                            </span>
                                            <button
                                                onClick={() => handleStatusChange(task)}
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition
                                                    ${task.status === "completed"
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                    }`}
                                            >
                                                {task.status}
                                            </button>
                                            <span className="text-sm text-gray-500">
                                                Due:{" "}
                                                {task.dueDate
                                                    ? new Date(task.dueDate).toLocaleDateString("en-US", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })
                                                    : "N/A"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mb-5">
                                        <button
                                            onClick={() => handleViewMore(task._id)}
                                            className="text-purple-700 font-medium"
                                        >
                                            View More
                                        </button>
                                        <button
                                            onClick={() => setEditTask(task)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FaEdit size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </div>

                            ))
                        }
                    </div>

                )

            }

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">

                    <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                                ? "bg-purple-900 text-white"
                                : "bg-gray-200"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>
            )}

            <AddTask isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <TaskDetail isOpen={showDetails} task={selectedTask} onClose={() => setShowDetails(false)} />
            {
                editTask &&

                <UpdateTask
                    task={editTask}
                    onClose={() => setEditTask(null)}
                />

            }

        </div>

    );


}

export default TaskList