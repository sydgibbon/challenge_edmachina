import React, { useState } from 'react';

function LeadForm() {
  const [leadData, setLeadData] = useState({
    full_name: '',
    email: '',
    address: '',
    phone: '',
    subjects: []
  });
  const [subject, setSubject] = useState({
    name: '',
    course_duration: '',
    enrollment_year: '',
    times_taken: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubjectChange = (e) => {
    const { name, value } = e.target;
    setSubject((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const addSubject = () => {
    setLeadData((prevState) => ({
      ...prevState,
      subjects: [...prevState.subjects, subject]
    }));
    setSubject({
      name: '',
      course_duration: '',
      enrollment_year: '',
      times_taken: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/leads/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    });
    const result = await response.json();
    setResponseMessage(`Lead registered with ID: ${result.id}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="full_name" placeholder="Full Name" value={leadData.full_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={leadData.email} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={leadData.address} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={leadData.phone} onChange={handleChange} required />

        <h3>Subjects</h3>
        <input type="text" name="name" placeholder="Subject Name" value={subject.name} onChange={handleSubjectChange} />
        <input type="number" name="course_duration" placeholder="Course Duration" value={subject.course_duration} onChange={handleSubjectChange} />
        <input type="number" name="enrollment_year" placeholder="Enrollment Year" value={subject.enrollment_year} onChange={handleSubjectChange} />
        <input type="number" name="times_taken" placeholder="Times Taken" value={subject.times_taken} onChange={handleSubjectChange} />
        <button type="button" onClick={addSubject}>Add Subject</button>

        <button type="submit">Submit Lead</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
}

export default LeadForm;