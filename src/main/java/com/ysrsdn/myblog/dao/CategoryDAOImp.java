package com.ysrsdn.myblog.dao;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ysrsdn.myblog.entity.Category;

@Repository
public class CategoryDAOImp implements CategoryDAO {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void saveOrUpdate(Category category) {
		// Get the current hibernate session
		Session session = this.sessionFactory.getCurrentSession();

		// Save or Update the post
		session.saveOrUpdate(category);
	}

	@Override
	public List<Category> findAll() {
		// Get the current hibernate session
		Session session = this.sessionFactory.getCurrentSession();

		List<Category> categories = null;

		// Find all categories and return the result
		try {
			categories = session.createQuery("from Category").getResultList();
		} catch (NoResultException e) {
			return null;
		}

		return categories;
	}

	@Override
	public Category find(int id) {
		// Get the current hibernate session
		Session session = this.sessionFactory.getCurrentSession();

		// Find the category and return it
		return session.find(Category.class, id);
	}

	@Override
	public void delete(int id) {
		// Get the current hibernate session
		Session session = this.sessionFactory.getCurrentSession();

		// Delete the post using 'id'
		TypedQuery query = session.createQuery("delete from Category where id=:theId"); // Setting up a parameter "theId"
		query.setParameter("theId", id); // binding the parameter "theId" to the actual value

		query.executeUpdate();

	}

}
