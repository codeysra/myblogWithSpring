package com.ysrsdn.myblog.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.validation.BindingResult;

import com.ysrsdn.myblog.entity.Post;
import com.ysrsdn.myblog.service.PostService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/rest-api/admin/post/")
public class AdminPostController {

	@Autowired
	private PostService postService;

	// add an initbinder ... to trim input strings and customize Date format
	@InitBinder
	public void initBinder(WebDataBinder dataBinder) {
		System.out.println("*******************");
		StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
		dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
 
	}

	// Create a new post
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<Object> createPost(@Valid @RequestBody Post post,BindingResult bindingResult) {
		this.postService.saveOrUpdate(post);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// Retrieve all posts
	@RequestMapping(value = "", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Post> retrieveAllPosts(HttpServletRequest req) {
		return this.postService.findAll();
	}

	// Retrieve a post given its id
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Post retrievePost(@PathVariable("id") int id) {
		return this.postService.find(id);
	}

	// Update a post
	@RequestMapping(value = "{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void updatePost(@PathVariable("id") int id, @RequestBody Post post) {
		post.setId(id);
		this.postService.saveOrUpdate(post);
	}

	// Delete a post
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void deletePost(@PathVariable("id") int id) {
		this.postService.delete(id);
	}

}
