package blog.api.controllers

import blog.api.domains.Post
import blog.api.repository.PostRepository
import groovy.transform.CompileStatic
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import jakarta.inject.Inject
import reactor.core.publisher.Mono

@Controller("/posts")
@CompileStatic
class PostController {

	@Inject PostRepository postRepository

	@Get
	Mono<List<Post>> getPosts() {
		return postRepository.findAll()
    }

}
