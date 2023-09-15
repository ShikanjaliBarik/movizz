import React from "react";
import firebase from "../firebase/firebase";
import styled from "styled-components";

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      // login successful, redirect to home page or perform other actions
    } catch (error) {
      // handle login error
      console.log(error);
    }
  };

  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/movix-logo.png" alt="" />
          <SignUp onClick={handleGoogleSignIn}>LOGIN WITH GOOGLE</SignUp>
          <Description>
           "Unleash a world of endless entertainment with our video
           streaming website, featuring a diverse range of captivating
           movies, series, and originals, available anytime, anywhere."
          </Description>
          
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

const CTA = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;


const CTALogoOne = styled.img`
  margin: 0 auto 12px;
  display: block;
  max-width: 200px;
  min-height: 1px;
  width: 100%;
`;


const SignUp = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 13px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
  font-family : Roboto Bold ;
`;


