package blog.api.repositories

import blog.api.domains.Post
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.PageableRepository

@JdbcRepository(dialect = Dialect.POSTGRES)
interface PostRepository extends PageableRepository<Post, Long> {}
