//package com.ysrsdn.myblog.security;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter{
//
////	@Bean
////	public BCryptPasswordEncoder passwordEncoder() {
////		return new BCryptPasswordEncoder();
////	}
////	
//	/**
//	 * Sets the valid users that can access the application
//	 */
//	@Autowired
//	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception{
//		// Already done in config file	
//	}
//	
//	/**
//	 * Configures the URL that can be accessed by the users
//	 */
//	@Override
//	protected void configure(HttpSecurity http) throws Exception{
//		
//		http.authorizeRequests().antMatchers("/login").permitAll().antMatchers("/admin*/**").hasAnyRole("ADMIN")
//		.and().formLogin();
//		
////		http.authorizeRequests().antMatchers("/login").permitAll().antMatchers("/*admin*/**").hasAnyRole("USER")
////		.and().formLogin().loginPage("/login").defaultSuccessUrl("/todos").failureUrl("/login?error=true")
////		.and().logout().logoutSuccessUrl("/logout-success")
////		.and().headers();
//		
//		 		 
//	}
//	
//}
