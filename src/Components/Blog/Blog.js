import React from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import  './Blog.css'
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { addPost } from '../../Redux/Action/LoginAction';

const Blog = (props) => {
    console.log(props)
    const {loggedUser, addPost, userPost} = props
    // console.log(loggedUser[0].user)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const user = loggedUser[0].user
        console.log(user)
        const post = data.post
        console.log(typeof(user), typeof(post))
        addPost(user, post)
        };
  
    return (
        <div>
                <Row className="blogTotal">
                    <Col xs={3} md={4} lg={4} className="userInfo">   
                    
                        <h1>Welcome, <br />{loggedUser[0].user}</h1>
                            <br /><br />
                        <h4>Here You can share your stories <br /> with community</h4>
                    
                    </Col>

                    <Col xs={6} md={8} lg={8} >
                        <Container className="userPost">
                            <h1>Your Stories</h1>
                            <br /><br /><br />
                            <div className="post">
                                <h2><b>POST</b></h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                
                                <br /><br />
                                <h6>Share Your Stories With Us</h6>
                                <textarea className="storySec" placeholder='your stories' {...register("post", { required: true })} />
                                <br /><br />
                                {errors.exampleRequired && <span>This field is required</span>}

                                <input className="logOutBtn" type="submit" value="POST"/>
                                </form>
                            </div>
                        </Container>
                    
                    </Col>
                </Row>
        </div>
    );
};


const mapStateToProps = state =>{

    return{
        loggedUser: state.loggedUser,
        userPost: state.userPost
        }

}

const mapDispatchToProps={
    
    addPost: addPost

}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);