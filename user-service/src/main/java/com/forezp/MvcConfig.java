package com.forezp;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/user/login").setViewName("login");
        registry.addViewController("/user/login.*").setViewName("login");
        registry.addViewController("/").setViewName("login");
        registry.addViewController("/index").setViewName("login");
        registry.addViewController("/index.*").setViewName("login");
        registry.addViewController("/Board.*").setViewName("Board");
        registry.addViewController("/foo.*").setViewName("Board");
        registry.addViewController("/foo").setViewName("Board");


        registry.addViewController("/alert").setViewName("alert");
        registry.addViewController("/alert.*").setViewName("alert");
        registry.addViewController("/alertDetail").setViewName("alertDetail");
        registry.addViewController("/alertDetail.*").setViewName("alertDetail");
        registry.addViewController("/search").setViewName("search");
        registry.addViewController("/search.*").setViewName("search");
        registry.addViewController("/searchDetail").setViewName("searchDetail");
        registry.addViewController("/searchDetail.*").setViewName("searchDetail");
        registry.addViewController("/ownUserInfoWindow").setViewName("ownUserInfoWindow");
        registry.addViewController("/ownUserInfoWindow.*").setViewName("ownUserInfoWindow");
        registry.addViewController("/ownPasswordWindow").setViewName("ownPasswordWindow");
        registry.addViewController("/ownPasswordWindow.*").setViewName("ownPasswordWindow");


        registry.addViewController("/admin/userManage").setViewName("admin/userManage");
        registry.addViewController("/admin/userManage.*").setViewName("admin/userManage");
        registry.addViewController("/admin/userInfoWindow").setViewName("admin/userInfoWindow");
        registry.addViewController("/admin/userInfoWindow.*").setViewName("admin/userInfoWindow");

        registry.addViewController("/404").setViewName("404");
        registry.addViewController("/404.*").setViewName("404");
    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/static/css/");
        registry.addResourceHandler("/fonts/**").addResourceLocations("classpath:/static/fonts/");
        registry.addResourceHandler("/images/**").addResourceLocations("classpath:/static/images/");
        registry.addResourceHandler("/js/**").addResourceLocations("classpath:/static/js/");
        registry.addResourceHandler("/vendor/**").addResourceLocations("classpath:/static/vendor/");

    }
}