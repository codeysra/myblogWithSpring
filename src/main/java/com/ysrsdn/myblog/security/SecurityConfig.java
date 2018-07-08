package com.ysrsdn.myblog.security;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import com.ysrsdn.myblog.security.jwt.JWTAuthenticationFilter;
import com.ysrsdn.myblog.security.jwt.JWTConfigurer;
import com.ysrsdn.myblog.security.jwt.TokenProvider;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
	 
	@Autowired
	private MySavedRequestAwareAuthenticationSuccessHandler authenticationSuccessHandler;
	 
	@Autowired
	private  AuthenticationManagerBuilder auth;
	
	@Autowired
	private TokenProvider tokenProvider;
	
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
		// Added CORS in the first phase of development (when the Rest API run on a separate port)
//		http
//		.cors();
		
		http
        .addFilterBefore(new JWTAuthenticationFilter(
                        "/rest-api/login", this.tokenProvider, authenticationManager()),
                UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling()
        .authenticationEntryPoint(new JWTAuthenticationEntryPoint())
        .accessDeniedHandler(new JWTAccessDeniedHandler())
		.and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .csrf()
        .disable()
        .authorizeRequests().antMatchers("/rest-api/login").permitAll().antMatchers("/rest-api/admin*/**").access("hasRole('ADMIN')")
        .and()
        .apply(securityConfigurerAdapter());
 
	

	}
	
	private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
	}
	@Bean
    public MySavedRequestAwareAuthenticationSuccessHandler mySuccessHandler(){
        return new MySavedRequestAwareAuthenticationSuccessHandler();
    }
    @Bean
    public SimpleUrlAuthenticationFailureHandler myFailureHandler(){
        return new SimpleUrlAuthenticationFailureHandler();
    }
	
    
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.unmodifiableList(Arrays.asList("*")));
        configuration.setAllowedMethods(Collections.unmodifiableList(Arrays.asList("HEAD",
                "GET", "POST", "PUT", "DELETE", "PATCH")));
        // setAllowCredentials(true) is important, otherwise:
        // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
        configuration.setAllowCredentials(true);
        // setAllowedHeaders is important! Without it, OPTIONS preflight request
        // will fail with 403 Invalid CORS request
        configuration.setAllowedHeaders(Collections.unmodifiableList(Arrays.asList("Access-Control-Allow-Headers","Authorization", "Cache-Control", "Content-Type","Access-Control-Request-Headers",
        		"x-csrf-token")));
        configuration.setExposedHeaders(Collections.unmodifiableList(Arrays.asList("x-csrf-token","x-xsrf-token","x-csrf-header","Access-Control-Allow-Headers",
        		"Authorization", "Cache-Control", "Content-Type")));
       
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);


        return source;
    }
    
    
}
