package server.controllers

import groovy.transform.CompileStatic
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import jakarta.inject.Inject
import server.domains.Post
import server.services.data.PostDataService

@Controller("/blog")
@CompileStatic
class BlogController {

	@Inject PostDataService postDataService

	@Get("/posts")
    List<Post> getPosts() {
		return postDataService.findAll()
    }

}
