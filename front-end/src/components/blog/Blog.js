import React from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import {Link} from 'react-router-dom';

class Blog extends React.Component{
    state={
        posts:{}
   };

    componentDidMount(){
        this.retrieveAllPosts();
        
        
    }
    
    retrieveAllPosts = ()=>{
        axios({
            method:'get',
            url:'http://localhost:8080/myblog/posts',
            
            headers: {
             }
        })
        .then(response=>{
             this.setState(()=>({posts:response.data}));
             console.log(this.state.posts);
        })
        .catch(error => {
            console.log("An error occured: "+error);
            console.log(error.response);
             
         });
    }

    render(){
        return (
            <div>
                <Header/>    

                <div id="outer-content-container" className=" container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div id="posts-container">
                                {
                        
                                    Array.from(this.state.posts).map((post)=>{
                
                                        return  <div key={post.id} className="card">
                                                    <h1 className="card-title">{post.title}</h1>
                                                    <p className="card-text">{post.smallDesc}</p>
                                                    <Link to={`/post/${post.id}`} >Read>></Link>
                                                 </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div id="right-sidebar-container">
                                <div id="about">
                                    <h1>About</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. 
                                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec </p>
                                </div>
                                 
                            </div>  
                        </div>
                    </div>
                    
                    
                </div>
                
                <Footer/>
            </div>
        );
    }
}


 

export default Blog;