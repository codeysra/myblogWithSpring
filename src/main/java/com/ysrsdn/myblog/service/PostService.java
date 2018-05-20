package com.ysrsdn.myblog.service;

import java.util.List;

import com.ysrsdn.myblog.entity.Post;

public interface PostService {
	public void saveOrUpdate(Post post);
	
	public List<Post> findAll();
	
	public Post find(int id);
	
 	public void delete(int id);
}
