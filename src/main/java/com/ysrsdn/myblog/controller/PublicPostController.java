package com.ysrsdn.myblog.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ysrsdn.myblog.entity.Post;
import com.ysrsdn.myblog.service.PostService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class PublicPostController {
	
	@Autowired
	private PostService postService;
	
 
	
	// Retrieve all posts
	@RequestMapping(value="/posts",method=RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Post> retrieveAllPosts(HttpServletRequest req){
		
		return this.postService.findAll();
	}
  

	// Retrieve a post given its id
	@RequestMapping(value="/posts/{id}",method=RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Post retrievePost(@PathVariable("id") int id){
		return this.postService.find(id);
	}
}
