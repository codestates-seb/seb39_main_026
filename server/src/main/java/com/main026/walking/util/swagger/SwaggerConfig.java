package com.main026.walking.util.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    private String version;
    private String title;

    @Bean
    public Docket apiMember() {
        version = "V1";
        title = "Member Controller API " + version;

        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("member")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.main026.walking.member"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo(title, version));
    }

    @Bean
    public Docket apiPet() {
        version = "V1";
        title = "Pet Controller API " + version;

        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .groupName("pet")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.main026.walking.pet"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo(title, version));
    }

    @Bean
    public Docket apiComment() {
        version = "V1";
        title = "Comment Controller API " + version;

        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .groupName("comment")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.main026.walking.comment"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo(title, version));
    }

    @Bean
    public Docket apiCommunity() {
        version = "V1";
        title = "Community Controller API " + version;

        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .groupName("community")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.main026.walking.community"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo(title, version));
    }

    @Bean
    public Docket apiNotice() {
        version = "V1";
        title = "Notice Controller API " + version;

        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .groupName("notice")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.main026.walking.notice"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo(title, version));
    }

    private ApiInfo apiInfo(String title, String version) {
        return new ApiInfoBuilder()
                .title(title)
                .description("Swagger 3.0 Test.")
                .version(version)
                .build();
    }
}
