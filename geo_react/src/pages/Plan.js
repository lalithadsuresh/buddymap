import React, { useState } from 'react';
import { Slider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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
    navigate('/submitted', { state: { formData } });
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
    '4.) on a scale of 1-10, how happy are you today?',
    '5.) on a scale of 1-10, how hungry are you today?',
    '6.) on a scale of 1-10, how outdoorsy would you rate yourself?',
    '7.) on a scale of 1-10, how social are you?',
    '8.) on a scale of 1-10, how bored are you?',
    '9.) on a scale of 1-10, how badly do you want to stay in?',
    '10.) on a scale of 1-10, how active do you want your plans to be?',
    '11.) on a scale of 1-10, how much do you like cold weather?',
    '12.) on a scale of 1-10, how much do you like warm weather?',
    '13.) on a scale of 1-10, how sad are you today?',
    '14.)  on a scale of 1-10, how badly do you want your friends to be a part of your plans?'



  ]

  

  const renderSliders = () => {
    const sliders = [];
    for (let i = 1; i <= 14; i++) {
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

  const [isActivePlan, setIsActivePlan] = useState(false);

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
          <br />
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
        <button type="submit" 
        onMouseEnter={() => setIsActivePlan(true)}
        onMouseLeave={() => setIsActivePlan(false)}
        style = {{
            
            display: 'inline-block',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            textDecoration: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: isActivePlan? '#4E2565' : '#FFFFFF',
            color: isActivePlan? '#FFFFFF' : '#4E2565',
            position: 'relative',
            left: '350px',
            top: '50px',
            boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'color 0.3s',
        
        
         }}
         
        
        to ='/submitted'> 
        Submit</button>
      </form>
      <div>
        {formData['City']}
        {formData['State']}
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i}>
            {formData[`Slider${i + 1}`]}</div>
        ))}
      </div>
    </div>
  );
};

export default function Plan() {
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