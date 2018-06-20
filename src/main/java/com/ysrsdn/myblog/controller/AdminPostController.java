package com.ysrsdn.myblog.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.csrf.CsrfToken;

import com.ysrsdn.myblog.entity.Post;
import com.ysrsdn.myblog.service.PostService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/admin/post/")
public class AdminPostController {
	
	@Autowired
	private PostService postService;
	
	// Create a new post
	@RequestMapping(value="",method=RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createPost(@RequestBody Post post) {
		
		this.postService.saveOrUpdate(post);
	}
	
	 
	
	// Retrieve all posts
	@RequestMapping(value="",method=RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Post> retrieveAllPosts(HttpServletRequest req){
		
		return this.postService.findAll();
	}
	
	
	
	// Retrieve a post given its id
	@RequestMapping(value="{id}",method=RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Post retrievePost(@PathVariable("id") int id){
		return this.postService.find(id);
	}
	
	// Update a post
	@RequestMapping(value="{id}", method=RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void updatePost(@PathVariable("id") int id,@RequestBody Post post) {
		post.setId(id);
		this.postService.saveOrUpdate(post);
	}
	
	// Delete a post
	@RequestMapping(value="{id}", method=RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void deletePost(@PathVariable("id") int id) {
		this.postService.delete(id);
	}
	
}
