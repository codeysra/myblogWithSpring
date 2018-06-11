package com.ysrsdn.myblog.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller

public class HomeController {
	
	@RequestMapping("/")
	public String getHome() {
		return "home";
	}
	@RequestMapping("/logout-success")
	public String logout() {
		return "home";
	}

}
