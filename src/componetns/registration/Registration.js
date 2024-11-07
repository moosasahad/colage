import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registration.css';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const navigate = useNavigate();

    // Single state object to manage form inputs
    const [formData, setFormData] = useState({
        StudentName: '',
        RollNumber: '',
        Class: 'Class 1',
        devision: '',
        SubjectMarks: '',
    });
    console.log("formData",formData);
    
    
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [teacherId, setTeacherId] = useState('');

    // Retrieve TeacherId from localStorage once when the component mounts
    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
            setTeacherId(id);
        }
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submit form data to the server
    const submitForm = async () => {
        try {
            const response = await axios.post('https://newbackendproject.onrender.com/marke', {
                ...formData,
                TeacherId: teacherId,
            });
            if (response.status === 200) {
                setSubmissionMessage('Form submitted successfully!');
                setFormData({
                    StudentName: '',
                    RollNumber: '',
                    Class: 'Class 1',
                    devision: '',
                    SubjectMarks: '',
                });
            }
            alert("submission successful")
        } catch (error) {
            setSubmissionMessage('Error submitting form. Please try again.');
            console.error('Error:', error);
        }
    };

    const goBackToLogin = () => {
        navigate('/');
    };

    const share = () => {
        navigate("/marks")
    };

    const report = () => {
        console.log("Reporting the entry!");
    };

    return (
        <div id="dashboard-page">
            <div className='main'>
                <div className='maindiv'>
                    <h2 id="subject-title">Teacher Dashboard</h2>
                    <h4 id="teacher-name">Welcome, Teacher!</h4>

                    <div className="mb-3">
                        <label htmlFor="studentName" className="form-label">Student Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="StudentName"
                            name="StudentName"
                            placeholder="Student Name"
                            value={formData.StudentName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="studentRollNo" className="form-label">Roll No</label>
                        <input
                            type="number"
                            className="form-control"
                            id="RollNumber"
                            name="RollNumber"
                            placeholder="Roll No"
                            value={formData.RollNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="classSelect" className="form-label">Select Class</label>
                        <select
                            id="Class"
                            name="Class"
                            className="form-select"
                            value={formData.Class}
                            onChange={handleChange}
                        >
                            <option value="Class 1">Class 1</option>
                            <option value="Class 2">Class 2</option>
                            <option value="Class 3">Class 3</option>
                            <option value="Class 4">Class 4</option>
                            <option value="Class 5">Class 5</option>
                            <option value="Class 6">Class 6</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="divisionSelect" className="form-label">Select Division</label>
                        <select
                            id="devision"
                            name="devision"
                            className="form-select"
                            value={formData.devision}
                            onChange={handleChange}
                        >   <option ></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select>
                    </div>

                    <h4>Enter Marks</h4>
                    <div className="mb-3">
                        <label htmlFor="subjectMarks" className="form-label">Subject Marks</label>
                        <input
                            type="number"
                            className="form-control"
                            id="SubjectMarks"
                            name="SubjectMarks"
                            placeholder="Subject Marks"
                            value={formData.SubjectMarks}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="button-group">
                        <button className="btn btn-success" onClick={submitForm}>Submit</button>
                        <button className="btn btn-secondary" onClick={goBackToLogin}>Back</button>
                        <button className="btn btn-info" onClick={share}>View Marks</button>
                        {/* <button className="btn btn-danger" onClick={report}>Report</button> */}
                    </div>

                    {submissionMessage && (
                        <div id="submission-message" className="text-success mt-3">
                            {submissionMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Registration;
