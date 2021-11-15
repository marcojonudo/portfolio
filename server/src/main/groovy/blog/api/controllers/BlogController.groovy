package blog.api.controllers

import blog.api.domains.Post
import blog.api.repositories.PostRepository
import groovy.transform.CompileStatic
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import jakarta.inject.Inject

@Controller
@CompileStatic
class BlogController {

	@Inject PostRepository postRepository

	@Get("/posts")
    Iterable<Post> getPosts() {
		return postRepository.findAll()
    }

}
