package com.ysrsdn.myblog.service;

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
	public void savePost(Post post) {
		this.postDAO.savePost(post);
	}
	
	
	
}
