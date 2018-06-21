package com.ysrsdn.myblog.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ysrsdn.myblog.entity.Category;
import com.ysrsdn.myblog.service.CategoryService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/admin/category/")
public class AdminCategoryController {

	@Autowired
	private CategoryService categoryService;

	// Create a new category
	@RequestMapping(value = "", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createCategory(@Valid @RequestBody Category category) {
		this.categoryService.saveOrUpdate(category);
	}

	// Retrieve all categories
	@RequestMapping(value = "", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Category> retrieveAllCategories() {
		return this.categoryService.findAll();
	}

	// Retrieve a given category (based on its id)
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Category retrievePost(@PathVariable("id") int id) {
		return this.categoryService.find(id);
	}

	// Update a given category
	@RequestMapping(value = "{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void updatePost(@PathVariable("id") int id, @RequestBody Category category) {
		category.setId(id);
		this.categoryService.saveOrUpdate(category);
	}

	// Delete a category
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void deletePost(@PathVariable("id") int id) {
		this.categoryService.delete(id);
	}
}
