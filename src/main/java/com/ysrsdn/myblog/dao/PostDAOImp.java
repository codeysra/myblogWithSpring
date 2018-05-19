package com.ysrsdn.myblog.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ysrsdn.myblog.entity.Post;
import com.ysrsdn.myblog.service.PostService;

@Repository
public class PostDAOImp implements PostDAO {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public void savePost(Post post) {
		// Get the current hibernate session
		Session session = this.sessionFactory.getCurrentSession();

		// Save the user
		session.saveOrUpdate(post);
	}

}
