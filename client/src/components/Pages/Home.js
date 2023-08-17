import React from 'react';
import styled from 'styled-components';
const htext = styled.span`
  color: #38B2AC;
  font-weight: bold;
`;
export default function Home() {
  return (
    <>
      <div className="home-page-bod">
        <span className="home-head">Hi,my name is Dhruv Karavadiya</span>
        <span className="home-subhead">I'm a Web Developer</span>
          <span className="short-intro">
            I am a passionate Computer Science undergraduate willing to put 
            <br />
            &nbsp; effort to learn something new each and everyday to sharpen my skills.
          </span>
        <button>Let's Connect</button>
      </div>
      <div className="about-block">
        <div className="about-head">
          <h5 className="section-no">01</h5>
          About
          <div className="hr-line"></div>
        </div>
        <div className="about-body">
        <p>
        I am an undergraduate pursuing a degree in <htext>Computer Science</htext> with a passion for competitive coding, particularly in Java. My strengths lie in data structures and algorithms, enabling me to efficiently solve complex problems.
      </p>
      <p>
        As a MERN stack developer, I have deep knowledge in Node.js and enjoy building robust web applications using modern technologies. I strive to create seamless user experiences and intuitive interfaces.
      </p>
      <p>
        I am a lifelong learner, always seeking to expand my knowledge and stay up-to-date with industry trends. I thrive in collaborative environments and am motivated to tackle new challenges in the field of computer science.
      </p>
        </div>
      </div>
    </>
  );
}
