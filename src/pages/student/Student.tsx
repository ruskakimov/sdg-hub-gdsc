import PageHeader from "../../common/components/PageHeader";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../api/firebase-setup";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe,faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import "./Student.css"
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBSwitch
} from 'mdb-react-ui-kit';


export default function Student() {
  const [user] = useAuthState(firebaseAuth);  

   const [inputValues, setInputValues] = useState({
    uniqueField: user?.email,
    input1: '',
    input2: '',
    input3: '',
    Portfolio: '',
    LinkedIn: '',
    Github: '',
    GScholar: '',
    IEEE: '',
    name: user?.displayName,
  });

   useEffect(() => {
    const email = user?.email;

    if(!email){
      return;
    }

    if(localStorage.getItem(email) === null){
      return;
    }
    setInputValues(s => ({
      ...s, 
      input1:JSON.parse(localStorage.getItem(email)||"")[0],
      input2:JSON.parse(localStorage.getItem(email)||"")[1],
      input3:JSON.parse(localStorage.getItem(email)||"")[2],
      Portfolio: JSON.parse(localStorage.getItem(email)||"")[3],
    LinkedIn: JSON.parse(localStorage.getItem(email)||"")[4],
    Github: JSON.parse(localStorage.getItem(email)||"")[5],
    GScholar: JSON.parse(localStorage.getItem(email)||"")[6],
    IEEE: JSON.parse(localStorage.getItem(email)||"")[7],
    }))
  
  }, [user])

  const handleChange = (event:any, inputName:any) => {
    setInputValues({
      ...inputValues,
      [inputName]: event.target.value,
    });
  };

 const handleSave = () => {
    const storedValues = localStorage.getItem(inputValues.uniqueField||"");

   const newArray = [inputValues.input1, inputValues.input2, inputValues.input3, inputValues.Portfolio,inputValues.LinkedIn,inputValues.Github,inputValues.GScholar,inputValues.IEEE];

    if (storedValues) {
      localStorage.setItem(inputValues.uniqueField||"", JSON.stringify(newArray));
    } else {
      localStorage.setItem(inputValues.uniqueField||"", JSON.stringify(newArray));
    }
  };


  return (
    <>
      <PageHeader title="Student" />
     <div className="btn-up-container">
       <MDBBtn onClick={handleSave} className="btn-up">Submit Changes</MDBBtn>
      </div>
      <section style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <div className="d-flex justify-content-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                  </div>
                <p className="text-muted mt-3 mb-3">Full Stack Developer</p>
                <div className="d-flex justify-content-center mb-2">
                    <div style={{display:'flex', justifyContent:"center", alignItems:"center"}}>
                  <MDBBtn>Follow</MDBBtn>
                  <MDBSwitch style={{marginLeft:"0px"}} id='flexSwitchCheckDefault' label='Looking for students' />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <FontAwesomeIcon icon={faGlobe} style={{ color: '#333333' }}  className="icons"/> 
                    <MDBCardText>
                      <input placeholder="Portfolio" value={inputValues.Portfolio}
                       onChange={(e) => handleChange(e, 'Portfolio')} 
                       type="text" /></MDBCardText>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <FontAwesomeIcon icon={faLinkedin} className="icons"/> 
                    <MDBCardText><input placeholder="LinkedIn" value={inputValues.LinkedIn}
                       onChange={(e) => handleChange(e, 'LinkedIn')} 
                       type="text" /></MDBCardText>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                     <FontAwesomeIcon icon={faGithub} className="icons"/> 
                    <MDBCardText><input placeholder="Github" value={inputValues.Github}
                       onChange={(e) => handleChange(e, 'Github')} 
                       type="text" /></MDBCardText>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                     <FontAwesomeIcon icon={faGraduationCap} className="icons"/> 
                    <MDBCardText><input placeholder="Google Scholar" value={inputValues.GScholar}
                       onChange={(e) => handleChange(e, 'GScholar')} 
                       type="text" /></MDBCardText>
                  </MDBListGroupItem>
                  
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                     <FontAwesomeIcon icon={faGraduationCap} className="icons"/> 
                    <MDBCardText><input placeholder="IEEE" value={inputValues.IEEE}
                       onChange={(e) => handleChange(e, 'IEEE')} 
                       type="text" /></MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText id="name" className="text-muted">{user?.displayName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText id="email" className="text-muted">{user?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Title</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText id="title" className="text-muted">
                      <input value={inputValues.input1}
                       onChange={(e) => handleChange(e, 'input1')} 
                       type="text" /></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>University</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText id="university" className="text-muted">
                      <input value={inputValues.input2}
                        onChange={(e) => handleChange(e, 'input2')} 
                        type="text"/></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <input value={inputValues.input3}
                      onChange={(e) => handleChange(e, 'input3')}  
                      type="text"/></MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}
