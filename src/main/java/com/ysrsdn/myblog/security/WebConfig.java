package com.ysrsdn.myblog.security;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
 
@Configuration
@EnableWebMvc
@ComponentScan
public class WebConfig implements WebMvcConfigurer  {

     public void addCorsMappings(CorsRegistry registry) {
    /*	
        registry.addMapping("/**")
        .allowedOrigins("*")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
                .allowedHeaders("*");
     */
    }
}