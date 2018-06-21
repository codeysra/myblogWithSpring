package com.ysrsdn.myblog.service;

import java.util.List;

import com.ysrsdn.myblog.entity.Category;

public interface CategoryService {
	
	public void saveOrUpdate(Category category);
	
	public List<Category> findAll();
	
	public Category find(String name);
	
	public void delete(String name);
}
