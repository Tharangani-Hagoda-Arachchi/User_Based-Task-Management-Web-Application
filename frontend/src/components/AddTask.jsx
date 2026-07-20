import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { newTask, clearMessages } from '../features/task/taskSlice.js';
import { toast } from 'react-toastify';

const AddTask = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    //redux state
    const { loading, message, error } = useSelector(state => state.task);

    //form state
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        priority: "low",
        status: "pending",
        dueDate: ""
    });

    //validaton error state
    const [errors, setErrors] = React.useState({})

    //input change handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //validate form
    const validateForm = () => {
        let validationErrors = {};

        //title validation
        if (!formData.title.trim()) {
            validationErrors.title = "Title is required"
        }
        else if (formData.title.trim().length < 3) {
            validationErrors.title = "title must contain at least 3 characters"
        }

        //desc validation
        if (!formData.description.trim()) {
            validationErrors.description = "desc riptionis required"
        }

        //duedate  validation

        if (!formData.dueDate) {
            validationErrors.dueDate = "Due date is required"
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    //add task form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("Sending Task:", formData);
            dispatch(
                newTask(formData)
            );

        }
    };

    // sucessfull adding
    useEffect(() => {
        if (message) {
            toast.success(message, { toastId: "add-success" });
            dispatch(clearMessages());
            setFormData({
                title: "",
                description: "",
                priority: "medium",
                status: "pending",
                dueDate: ""
            });
            setErrors({});
            setTimeout(() => {
                onClose();
            }, 1000)
        }
        if (error) {
            toast.error(error, { toastId: "add-error" });
            dispatch(clearMessages());
        }
    }, [message, error, dispatch]);



    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-xl w-full max-w-md p-8 relative shadow-xl'>
                <button onClick={onClose} className='absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl' > x </button>

                <h2 className='text-3xl font-bold text-center text-purple-900 mb-6'>ADD NEW TASK</h2>
                <p className='text-center text-gray-500 mt-2 mb-6'>
                    Add your new task to organize and manage efficiently.
                </p>

                <form className='space-y-4' onSubmit={handleSubmit}>

                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder='Task Title'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />
                    {
                        errors.title &&
                        <p className='text-red-500 text-sm'>{errors.title}</p>
                    }

                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        placeholder='Task Description'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />
                    {
                        errors.description &&
                        <p className='text-red-500 text-sm'>{errors.description}</p>
                    }

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
                    {
                        errors.priority &&
                        <p className='text-red-500 text-sm'>{errors.priority}</p>
                    }

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
                    {
                        errors.status &&
                        <p className='text-red-500 text-sm'>{errors.status}</p>
                    }

                    <input
                        type='datetime-local'
                        name='dueDate'
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                        placeholder='Due Date'
                        className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />
                    {
                        errors.dueDate &&
                        <p className='text-red-500 text-sm'>{errors.dueDate}</p>
                    }

                    <button type='submit' className='w-full bg-purple-600 hover:bg-purple-900 text-white py-3 rounded-lg font-semibold transition'> Add new task </button>

                </form>
            </div>
        </div>
    )
}

export default AddTask