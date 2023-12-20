// components/Search.js

import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    company: '',
    location: '',
    title: '',
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/searchPeople', { params: form });
      console.log(response); // Log the response
      setResults(response.data);
    } catch (error) {
      console.error(error); // Log any errors that occur during the request
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="surname" value={form.surname} onChange={handleChange} placeholder="Surname" />
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <button type="submit">Search</button>
      </form>
      <div>
      {results.map((person, index) => (
  <div key={index}>
    <h2>{person.first_name || 'First name not provided'} {person.last_name || 'Last name not provided'}</h2>
    <p>{person.full_name || 'Full name not provided'}</p>
    <img src={person.profile_pic_url || 'default_pic_url'} alt="Profile pic" />
    <img src={person.background_cover_image_url || 'default_cover_image_url'} alt="Background cover image" />
    <p>{person.occupation || 'Occupation not provided'}</p>
    <p>{person.headline || 'Headline not provided'}</p>
    <p>{person.summary || 'Summary not provided'}</p>
    <p>{person.city || 'City not provided'}</p>
    <p>{person.state || 'State not provided'}</p>
    <p>{person.country || 'Country not provided'}</p>
    <p>{person.country_full_name || 'Full country name not provided'}</p>
    <div>
      <h3>Experiences</h3>
      {person.experiences.map((experience, i) => (
  <div key={i}>
    <p>{experience.title || 'Title not provided'}</p>
    <p>{experience.company || 'Company not provided'}</p>
    <p>Start Date: {experience.start_date ? new Date(experience.start_date).toLocaleDateString() : 'Start date not provided'}</p>
    <p>End Date: {experience.end_date ? new Date(experience.end_date).toLocaleDateString() : (i === 0 ? 'Current Role' : 'End date not provided')}</p>
    {/* Add more fields as needed */}
  </div>
))}
    </div>
    <div>
      <h3>Education</h3>
      {person.education.map((education, i) => (
        <div key={i}>
          <p>{education.school || 'School not provided'}</p>
          <p>{education.degree_name || 'Degree not provided'}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  </div>
))}
      </div>
    </div>
  );
}

export default Search;