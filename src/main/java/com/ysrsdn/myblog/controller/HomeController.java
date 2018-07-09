package com.ysrsdn.myblog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	

	@RequestMapping(value= {"/","/error"})
	public String getHomeJSP() {
		return "home.jsp";
	}
}
