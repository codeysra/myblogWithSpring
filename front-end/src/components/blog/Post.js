// Represents a single post

import React from 'react';
import Header from './Header'
import Footer from './Footer'

import axios from 'axios'


class Post extends React.Component{
    state={
        post:{}
    }
    componentDidMount(){
        const url = `http://localhost:8080/myblog/posts/${this.props.match.params.id}`;
        axios({
            method:'get',
            url:url,
            
            headers: {
             }
        })
        .then(response=>{
             this.setState(()=>({post:response.data}));
             console.log(this.state.post);
        })
        .catch(error => {
            console.log("An error occured: "+error);
            console.log(error.response);
             
         });
    }
    render(){
    return(
    <div>

        <Header/>
        <div id="outer-content-container" className=" container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="posts-container">
                        <div className="card">
                            <h1 className="card-title">{this.state.post.title}</h1>
                            <div className="post-info py-4">
                                <span>Published on: {this.state.post.publishedOn}</span>
                                <span className="ml-3">Category: {this.state.post.category}</span>
                            </div>
                            <p className="card-text mb-3">{this.state.post.content}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div id="right-sidebar-container">
                        <div id="about">
                            <h1>About</h1>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. 
                                Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec 
                            </p>
                        </div>
                            
                    </div>  
                </div>
            </div>
        </div>
                        
        <Footer/>
            
            
    </div>
    )
    }

}

export default Post;
