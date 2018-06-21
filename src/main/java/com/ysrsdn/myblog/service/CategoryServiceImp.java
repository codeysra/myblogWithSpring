package com.ysrsdn.myblog.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ysrsdn.myblog.dao.CategoryDAO;
import com.ysrsdn.myblog.entity.Category;

@Service
public class CategoryServiceImp implements CategoryService{
	
	@Autowired
	private CategoryDAO categoryDAO;
	
	@Transactional
	@Override
	public void saveOrUpdate(Category category) {
		this.categoryDAO.saveOrUpdate(category);
	}

	@Transactional
	@Override
	public List<Category> findAll() {
		return this.categoryDAO.findAll();
	}

	@Transactional
	@Override
	public Category find(String name) {
		return this.categoryDAO.find(name);
	}

	@Transactional
	@Override
	public void delete(String name) {
		this.categoryDAO.delete(name);
	}

	
}
