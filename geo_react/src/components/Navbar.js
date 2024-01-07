import React, { useState } from 'react'
import { Link } from 'react-router-dom';



const Logo = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="leftSide"> 
      <div style={{ marginRight: 30 }}> </div> 
      <h1 
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        width: 'auto',
        height: 60,
        padding: '10px 30px',
        background: isActive ? '#4E2565' : '#FFFFFF',
        transition: 'background 0.3s',
        borderRadius: 30,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        marginLeft: '20px'
      }}>
        
        <div style={{
          fontSize: 30,
          fontFamily: 'Inria Sans',
          fontWeight: '700',
          wordWrap: 'break-word',
        }}>
          <a style={{
            textDecoration: 'none',
            color: isActive ? '#FEFDFF' : '#4E2565',
            transition: 'color 0.3s',
          }}
          href='/home'>buddymap</a>
        </div>
      </h1>
    </div>
  );
};




const Right = () => {
  const [isActiveExplore, setIsActiveExplore] = useState(false);
  const [isActivePlan, setIsActivePlan] = useState(false);

  return (
    <div className="rightSide">
      <div
        onMouseEnter={() => setIsActiveExplore(true)}
        onMouseLeave={() => setIsActiveExplore(false)}
        style={{
          width: 200,
          height: 60,
          background: isActiveExplore ? '#5A307C' : '#FFFFFF',
          transition: 'background .3s',
          borderRadius: 20,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'inline-flex',
          marginLeft: 400,
          marginTop: 10,
          position: 'fixed',
          top: 31,
          left: 650,
        }}>
        <div
          style={{
            color: isActiveExplore ? '#FEFDFF' : '#5A307C',
            fontSize: 25,
            fontFamily: 'Inria Sans',
            fontWeight: '700',
            wordWrap: 'break-word',
            transition: 'color .3s',
          }}>
          <Link
            style={{
              textDecoration: 'none',
              color: isActiveExplore ? '#FEFDFF' : '#5A307C',
              transition: 'background .3s',
            }}
            to ='/explore'> explore </Link>
        </div>
      </div>
      <div
        onMouseEnter={() => setIsActivePlan(true)}
        onMouseLeave={() => setIsActivePlan(false)}
        style={{
          width: 200,
          height: 60,
          background: isActivePlan ? '#5A307C' : '#FFFFFF',
          transition: 'background .3s',
          borderRadius: 20,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'inline-flex',
          position: 'fixed',
          top: 40,
          left: 800,
        }}
      >
        <div
          style={{
            color: isActivePlan ? '#FEFDFF' : '#5A307C',
            transition: 'color .3s',
            fontSize: 25,
            fontFamily: 'Inria Sans',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              color: isActivePlan ? '#FEFDFF' : '#5A307C',
              transition: 'background .3s',
            }}
            to='/plan'
          >
            plan
          </Link>
        </div>
      </div>
    </div>
  );
};


function Navbar() {




  const [click, setClick] = useState(false);
  return (
    <div className="navbar">
      <div className="leftside">
        <Logo/> 
      </div>
      <div className="rightside">
        <Right/>
      </div>




      </div>
  );
}
  
  export default Navbar;