import React, { useState } from 'react';
import { Slider } from '@material-ui/core';

const MyForm = () => {
  const [formData, setFormData] = useState({
    City: '',
    State: '',
    Slider1: 0,
    Slider2: 0,
    Slider3: 0,
    Slider4: 0,
    Slider5: 0,
    Slider6: 0,
    Slider7: 0,
    Slider8: 0,
    Slider9: 0,
    Slider10: 0,
    Slider11: 0,
    Slider12: 0,
  });

  const [submitted, setSubmitted] = useState(false);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with form data (e.g., send to server)
    console.log('Form data submitted:', formData);
    setSubmitted(true);
  };

  const mark = [];

  for (let i = 0; i < 11; i++) {
    mark.push({
      value: i,
      label: i.toString(),
    });
  }

  const questionsArray = [
    'NONE',
    '1.) on a scale of 1-10, how tired are you today?',
    '2.) on a scale of 1-10, how adventurous are you today?',
    '3.) on a scale of 1-10, how happy are you today?',

  ]

  const renderSliders = () => {
    const sliders = [];
    for (let i = 1; i <= 12; i++) {
      <br />
      sliders.push(
        <div key={i}>
        <p style = {{ position: 'relative', left: '40px' }}>{questionsArray[i]}</p> 
        <div style={{ width: 200, position: 'relative', left: '40px' }}>
          <Slider
            color='#5A307C'
            defaultValue={5}
            max={10}
            step={1}
            marks={mark}
            value={formData[`Slider${i}`]}
            onChange={(e, value) =>
              setFormData({ ...formData, [`Slider${i}`]: value })
            }
          />
        </div>
        </div>
      );
    }
    return sliders;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{ color: '#FFFFF', fontFamily: 'Inria Sans', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: 'normal', position: 'relative', left: '40px', }}>
          City:
          <input
            type="text"
            name="City"
            value={formData.City}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label style={{ color: '#FFFFF', fontFamily: 'Inria Sans', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: 'normal', position: 'relative', left: '40px', }}>
          State (abbr.):
          <input
            type="text"
            name="State"
            value={formData.State}
            onChange={handleInputChange}
          />
        </label>
        <br />
        {renderSliders()}
        <button type="submit">Submit</button>
      </form>
      <div>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i}>
            {formData[`Slider${i + 1}`]}</div>
        ))}
      </div>
    </div>
  );
};

export default function Explore() {
  return (
    <div>
      <h1 style={{ position: 'relative', left: '40px', fontFamily: 'Inria Sans' }}>
        weekend plans survey
      </h1>
      <l1 style={{ position: 'relative', left: '40px', fontFamily: 'Inria Sans' }}>
        Please fill out this survey for your weekend plans to generate!
        <br />
        Remember to answer each question as accurately as possible.
      </l1>
      <br />
      <br />
      <MyForm />
    </div>
  );
}