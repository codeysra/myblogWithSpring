package com.ysrsdn.myblog.security.jwt;

import io.jsonwebtoken.*;
//import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

//@Slf4j
@Component
public class TokenProvider {

    private static final String AUTHORITIES_KEY = "auth";

    private String secretKey = "secret";

    private long tokenValidityInMilliseconds = 1000 * 86400;

    public String createToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity = new Date(now + this.tokenValidityInMilliseconds);

        return Jwts.builder().setSubject(authentication.getName()).claim(AUTHORITIES_KEY, authorities)
                .signWith(SignatureAlgorithm.HS512, secretKey).setExpiration(validity).compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();

        Collection<? extends GrantedAuthority> authorities = Arrays
                .stream(claims.get(AUTHORITIES_KEY).toString().split(",")).map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new UsernamePasswordAuthenticationToken(claims.getSubject(), token, authorities);
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
        	System.out.println("Invalid JWT signature.");
            System.out.println("Invalid JWT signature trace: {}");
        } catch (MalformedJwtException e) {
        	System.out.println("Invalid JWT token.");
            System.out.println("Invalid JWT token trace: {}");
        } catch (ExpiredJwtException e) {
        	System.out.println("Expired JWT token.");
            System.out.println("Expired JWT token trace: {}");
        } catch (UnsupportedJwtException e) {
        	System.out.println("Unsupported JWT token.");
            System.out.println("Unsupported JWT token trace: {}");
        } catch (IllegalArgumentException e) {
        	System.out.println("JWT token compact of handler are invalid.");
            System.out.println("JWT token compact of handler are invalid trace: {}");
        }
        return false;
    }
}