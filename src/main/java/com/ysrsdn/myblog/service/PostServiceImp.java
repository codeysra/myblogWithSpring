package com.ysrsdn.myblog.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ysrsdn.myblog.dao.PostDAO;
import com.ysrsdn.myblog.entity.Post;

@Service
public class PostServiceImp implements PostService{

	@Autowired
	private PostDAO postDAO;
	
	@Transactional
	@Override
	public void saveOrUpdate(Post post) {
		this.postDAO.saveOrUpdate(post);
	}

	
	@Transactional
	@Override
	public List<Post> findAll() {
		return this.postDAO.findAll();
	}

	@Transactional
	@Override
	public Post find(int id) {
 		return this.postDAO.find(id);
	}

	@Transactional
	@Override
	public void delete(int id) {
 		this.postDAO.delete(id);
	}
	
	
	
}
