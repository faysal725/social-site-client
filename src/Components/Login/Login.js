import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Login.css'
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { addUser, removeUser } from '../../Redux/Action/LoginAction';
import { connect } from 'react-redux';




const Login = (props) => {
    console.log(props)
    

    const {loggedUser, addUser} = props
    

    console.log(loggedUser[0].user, loggedUser[0].isLoggedIn)

    const [userLog, setUserLog] = useState(true)
    const { register, handleSubmit } = useForm();
    const onSubmit = data =>{

        console.log(data.Email, data.Password)
        const email = data.Email;
        const password= data.Password;
        if (userLog === true) {
            registration(email, password)
            
        }else{
            signIn(email,password)
            
        }
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app(); // if already initialized, use that one
      }


      const registration = (email, password) =>{

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
            var user = userCredential.user.email;
            var token = userCredential.accessToken;
            addUser(user)
            console.log(user,token, "Register In")
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            });
      }




      const signIn = (email, password) =>{

            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
            // Signed in
            var user = userCredential.user.email;
            addUser(user)
            console.log(user, "signed In")
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            });
  }

    
        const googleSignIn=()=>{
            const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth()
                .signInWithPopup(provider)
                .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user.email;
                console.log(user, credential, token)
                addUser(user)
                }).catch((error) => {
    
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage, email, credential)

                });
        }




    return (
        <div>
            <Row>
            <Col lg="6" md="4" sm="12" className="titlePart text-center">
                <div className="description">
                    {/* <p>{loggedUser[0].user === "none"}</p> */}
                    <h1>FAKEBOOK</h1>
                    <h4>Facebook helps you connect and <br />
                     share with the people in your life.</h4>
                </div>
                
            </Col>
            <Col lg="6" md="4" sm="12" className="loginPart">
                <div className="login">
                    {
                        userLog ? 
                        <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Register</h2><br /><br />

                        <label><b>Your Email</b></label><br /> 
                        <input {...register("Email", { required: true , pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} /><br /><br />

                        <label><b>Your Password</b></label><br /> 
                        <input {...register("Password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} /><br/><br/>

                        <input className="submitBtn" type="submit" value="Register"/>
                        <br /><br />

                        <p onClick={()=> setUserLog(!userLog)}>Not New User? Please Sign Up</p>
                        </form>
                        </>:
                        <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Sign In</h2><br /><br />
                        
                        <label><b>Your Email</b></label><br /> 
                        <input {...register("Email", { required: true , pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} /><br /><br />
                        
                        <label><b>Your Password</b></label><br /> 
                        <input {...register("Password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} /><br /><br />

                        <input className="submitBtn" type="submit" value="Sign In"/>
                        <br /><br />
                        <p onClick={()=> setUserLog(!userLog)}> New User? Please Register</p>
                        </form>
                        </>
                    }
                    

                    <button onClick={() => googleSignIn()} className="googleBtn">Login with Google</button>
                </div>
                    
            </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loggedUser: state.loggedUser,
        defaultUser: state.defaultUser
    }
}


const mapDispatchToProps = {
    addUser: addUser,
    removeUser: removeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)