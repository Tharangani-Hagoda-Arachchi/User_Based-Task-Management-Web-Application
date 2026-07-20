import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, updaeteOfTask } from '../features/task/taskSlice.js';
import { toast } from 'react-toastify';

const UpdateTask = ({ task, onClose }) => {
    const dispatch = useDispatch();

    //form state
    const [formData, setFormData] = React.useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate.slice(0, 16)
    });

    //input change handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //update task form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updaeteOfTask({
                taskId: task._id,
                taskData: formData
            })
        );
        onClose();

    };

    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-xl w-full max-w-md p-8 relative shadow-xl'>
                <button onClick={onClose} className='absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl' > x </button>

                <h2 className='text-3xl font-bold text-center text-purple-900 mb-6'>UPDATE TASK</h2>
                <p className='text-center text-gray-500 mt-2 mb-6'>
                    Update task to organize and manage efficiently.
                </p>

                <form className='space-y-4' onSubmit={handleSubmit}>

                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Task Title'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />

                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder='Task Description'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />

                    <select
                        name='priority'
                        value={formData.priority}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    >
                        <option value="" disabled>
                            Select Priority
                        </option>
                        <option value="high">high</option>
                        <option value="medium">medium</option>
                        <option value="low">low</option>
                    </select>

                    <select
                        name='status'
                        value={formData.status}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    >
                        <option value="" disabled>
                            Select Status
                        </option>
                        <option value="pending">Pending</option>
                        <option value="completed">completed</option>
                    </select>

                    <input
                        type='datetime-local'
                        name='dueDate'
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                        placeholder='Due Date'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />

                    <button type='submit' className='w-full bg-purple-600 hover:bg-purple-900 text-white py-3 rounded-lg font-semibold transition'> Update Task </button>

                </form>
            </div>
        </div>
    )
}

export default UpdateTask