import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList.jsx";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    const handleLogout = async () => {
        const result = await dispatch(logoutUser());

        if (logoutUser.fulfilled.match(result)) {
            localStorage.removeItem("accessToken");
            navigate("/");
        } else {
            console.error(result.payload);
        }
    };


    return (
        <div className='flex flex-col lg:flex-row min-h-screen'>
            <div className='w-full lg:w-52 bg-purple-900 min-h-20 lg:min-h-screen flex  '>
                <h2 className='text-white text-xl font-bold p-5'>Dashboard</h2>
            </div>
            <div className='flex-1 bg-gray-100 min-h-screen p-6' >
                <div className=" bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4  ">
                    <div>
                        {
                            loading ? (
                                <h2>Loading...</h2>
                            ) : (
                                <>
                                    <h1 className="text-1xl font-bold text-purple-900 mb-1"> Welcome, {user?.name || "User"}... </h1>
                                    <p className="text-gray-600 text-sm"> {user?.email} </p>
                                    <p className="text-gray-400 text-sm"> Here's what's happenig with your tasks </p>
                                </>
                            )
                        }
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button onClick={handleLogout} className="bg-purple-900 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition w-full sm:w-auto">
                            Logout
                        </button>
                    </div>

                </div>

                <TaskList />
            </div>

        </div>
    )
}

export default Dashboard