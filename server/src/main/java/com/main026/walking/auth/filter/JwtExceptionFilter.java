package com.main026.walking.auth.filter;

import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ErrorResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;

@Component
public class JwtExceptionFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request,response);
        }catch (BusinessLogicException ex){
            setErrorResponse(request,response,ex);
        }
    }

    public void setErrorResponse(HttpServletRequest request, HttpServletResponse response,BusinessLogicException ex) throws IOException{
        response.setStatus(ex.getExceptionCode().getStatus());
        response.setContentType("application/json; charset=UTF-8");

        response.getWriter().write(new ErrorResponse(ex.getExceptionCode()).convertToJson());
    }
}
