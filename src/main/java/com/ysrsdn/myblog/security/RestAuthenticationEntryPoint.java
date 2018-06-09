package com.ysrsdn.myblog.security;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
/**
 * Override the default behavior of redirecting to the login page every time a protected URL is accessed 
 * Now, when a protected URL is accessed, an error code of 401 (Unauthorized) will be returned as a response
 * Reference: <a href="http://www.baeldung.com/securing-a-restful-web-service-with-spring-security#ch_3_3">http://www.baeldung.com</a>
 */
@Component( "restAuthenticationEntryPoint" )
public class RestAuthenticationEntryPoint
  implements AuthenticationEntryPoint{
 
   @Override
   public void commence(
     HttpServletRequest request,
     HttpServletResponse response, 
     AuthenticationException authException) throws IOException {
  
      response.sendError( HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized" );
   }
}