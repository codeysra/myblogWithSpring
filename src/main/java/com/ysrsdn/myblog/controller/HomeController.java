package com.ysrsdn.myblog.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
public class HomeController {
	
	@RequestMapping("/")
	public String getHome() {
		return "home";
	}
	
//	public ResponseEntity getHome() {
//		return new ResponseEntity<>(HttpStatus.OK);
//	}
	@RequestMapping("/logout-success")
	public String logout() {
		return "home";
	}

}
