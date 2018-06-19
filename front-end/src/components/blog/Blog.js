import React from 'react'
import Header from './Header'
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

                <div className="outer-content-container container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="posts-container ">
                                {
                        
                                    Array.from(this.state.posts).map((post)=>{
                
                                        return  <div key={post.id} className="card">
                                                    <h2 className="card-title">{post.title}</h2>
                                                    <p className="card-text">{post.smallDesc}</p>
                                                    <Link to={`/admin/post/update/${post.id}`} >Read>></Link>
                                                 </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="right-sidebar-container">
                                <div id="about">
                                    <h1>About</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. 
                                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec </p>
                                </div>
                                <div id="categories">
                                    <h1>Categories</h1>
                                    <ul>
                                        <li>Java</li>
                                        <li>Spring</li>
                                        <li>Html</li>
                                    </ul>
                                </div>
                            </div>  
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>
        );
    }
}


 

export default Blog;