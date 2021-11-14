package blog.api.controllers

import blog.api.domains.Post
import blog.api.repositories.PostRepository
import groovy.transform.CompileStatic
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule

@Controller
@CompileStatic
@Secured(SecurityRule.IS_ANONYMOUS)
class BlogController {

	final PostRepository postRepository

	BlogController(PostRepository postRepository) {
		this.postRepository = postRepository
	}

	@Get("/post")
    Post getPost() {
		return postRepository.find()
    }

	@Get("/posts")
    Iterable<Post> getPosts() {
		return postRepository.findAll()
    }

}
