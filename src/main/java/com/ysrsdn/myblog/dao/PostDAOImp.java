package com.ysrsdn.myblog.dao;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ysrsdn.myblog.entity.Post;

@Repository
public class PostDAOImp implements PostDAO {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void saveOrUpdate(Post post) {
		// Get the current hibernate session
		Session session = this.sessionFactory.getCurrentSession();

		// Save or Update the post
		session.saveOrUpdate(post);
	}

	@Override
	public List<Post> findAll() {
		// Get the current hibernate session
		Session session = this.sessionFactory.getCurrentSession();

		List<Post> posts = null;
		// Find all posts and return the result
		try {
			posts = session.createQuery("from Post").getResultList();
		} catch (NoResultException e) {
			return null;
		}

		return posts;
	}

	@Override
	public Post find(int id) {
		// Get the current hibernate session
		Session session = this.sessionFactory.getCurrentSession();

		// Find the post and return it
		return session.find(Post.class, id);
	}

	@Override
	public void delete(int id) {
		// Get the current hibernate session
		Session session = this.sessionFactory.getCurrentSession();

		// Delete the post using 'id'
		TypedQuery query = session.createQuery("delete from Post where id=:theId"); // Setting up a parameter "theId"
		query.setParameter("theId", id); // binding the parameter "theId" to the actual value

		query.executeUpdate();
	}

	@Override
	public void updateStatus(int id, boolean newStatus) {
		// Get the current hibernate session
		Session session = this.sessionFactory.getCurrentSession();
		
		Post post = session.find(Post.class, id);
		
		post.setStatus(newStatus);
		
		session.saveOrUpdate(post);
		
	}
	
	

}
