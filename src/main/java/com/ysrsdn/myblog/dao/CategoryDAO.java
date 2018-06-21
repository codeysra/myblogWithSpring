package com.ysrsdn.myblog.dao;

import java.util.List;

import com.ysrsdn.myblog.entity.Category;

public interface CategoryDAO {
	
	public void saveOrUpdate(Category category);
	
	public List<Category> findAll();
	
	public Category find(int id);
	
	public void delete(int id);
}
