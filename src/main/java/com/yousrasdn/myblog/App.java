package com.yousrasdn.myblog;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
    	int i = 0;
    	while (i < 10) {
    		String password = "admin";
    		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    		String hashedPassword = passwordEncoder.encode(password);

    		System.out.println(hashedPassword);
    		i++;
    	}

    }
}
