package com.ysrsdn.myblog.dao;

import java.util.List;

import com.ysrsdn.myblog.entity.Post;

public interface PostDAO {
	public void saveOrUpdate(Post post);
	
	public List<Post> findAll();
	
	public Post find(int id);
	
	public void delete(int id);
	
	public void updateStatus(int id, boolean newStatus);
}
