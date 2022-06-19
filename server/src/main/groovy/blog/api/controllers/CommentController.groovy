package blog.api.controllers

import blog.api.domains.Comment
import blog.api.repository.CommentRepository
import groovy.transform.CompileStatic
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Post
import jakarta.inject.Inject

@Controller("/comments")
@CompileStatic
class CommentController {

	@Inject CommentRepository commentRepository

	@Get("/{postPath}")
	List<Comment> getComments(@PathVariable String postPath) {
		return commentRepository.findAll(postPath)
    }

	@Post
	HttpResponse saveComment(@Body Comment comment) {
		commentRepository.save(comment)
//		comment.parent ? commentRepository.add(comment) : commentRepository.save(comment)
		return HttpResponse.created(comment)
    }

}
