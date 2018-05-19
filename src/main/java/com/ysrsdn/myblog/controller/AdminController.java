package com.ysrsdn.myblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
 import org.springframework.web.bind.annotation.RestController;

import com.ysrsdn.myblog.entity.Post;
import com.ysrsdn.myblog.service.PostService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private PostService postService;
	
	@RequestMapping(value="/post/add",method=RequestMethod.POST)
 	@ResponseBody
	public String addPost(@RequestBody Post post) {
		System.out.println("***********    "+post.getId()+ "******************");
		this.postService.savePost(post);
		System.out.println("***********    "+post.getId()+ "******************");
		return "good";
	}
	
}
