package com.ysrsdn.myblog.security;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
	 
	@Autowired
	private MySavedRequestAwareAuthenticationSuccessHandler authenticationSuccessHandler;
	 
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	/**
	 * Sets the valid users that can access the application
	 */
	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception{
		// Already done in config file	
	}
	
	/**
	 * Configures the URL that can be accessed by the users
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception{
		
		
		
		http
		.csrf().disable()
		.cors()
		;
//		.and()
//        .exceptionHandling()
//        .authenticationEntryPoint(restAuthenticationEntryPoint)
//        .and()
//        .authorizeRequests()
//        .antMatchers(HttpMethod.OPTIONS,"/**").permitAll();
//        .antMatchers("/login").permitAll().antMatchers("/admin*/**").hasAnyRole("ADMIN");
//        .and()
//        .formLogin()
//        .successHandler(authenticationSuccessHandler)
//        .failureHandler(new SimpleUrlAuthenticationFailureHandler())
//        .and()
//        .logout();
        
 		
		// CSRF tokens handling
     //  http.addFilterAfter(new CsrfTokenResponseHeaderBindingFilter(), CsrfFilter.class);
 		 
	}
	
	@Bean
    public MySavedRequestAwareAuthenticationSuccessHandler mySuccessHandler(){
        return new MySavedRequestAwareAuthenticationSuccessHandler();
    }
    @Bean
    public SimpleUrlAuthenticationFailureHandler myFailureHandler(){
        return new SimpleUrlAuthenticationFailureHandler();
    }
	
  
    
    
}
