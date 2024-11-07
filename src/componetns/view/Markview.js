import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Markview.css';

function Markview() {
  const [marksData, setMarksData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const TeacherId = localStorage.getItem('id');

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/allmarke/${TeacherId}`);
        setMarksData(response.data.details[0]?.student || []);
      } catch (err) {
        setError('Error fetching marks data');
        console.error(err);
      }
    };

    if (TeacherId) {
      fetchData();
    } else {
      setError('No teacher ID found in local storage');
    }
  }, []);

  return (
    <div className="markview-container">
      <h2>Mark View</h2>
      {error && <p className="error-message">{error}</p>}
      
      {marksData.length > 0 ? (
        <div className="table-container">
          <table className="marks-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Roll Number</th>
                <th>Class</th>
                <th>Division</th>
                <th>Subject Marks</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((mark, index) => (
                <tr key={index}>
                  <td>{mark.StudentName}</td>
                  <td>{mark.RollNumber}</td>
                  <td>{mark.Class}</td>
                  <td>{mark.devision}</td>
                  <td>{mark.SubjectMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && <p>No marks data available</p>
      )}
    </div>
  );
}

export default Markview;
