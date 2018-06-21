package com.ysrsdn.myblog.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	
	@RequestMapping(value="", method=RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createCategory(@Valid @RequestBody Category category) {
		this.categoryService.saveOrUpdate(category);
	}
	
	
}
