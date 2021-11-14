package blog.api.domains

import io.micronaut.data.annotation.GeneratedValue
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity

import javax.validation.constraints.NotNull

@MappedEntity
class Post {

	@Id
	@GeneratedValue(GeneratedValue.Type.AUTO)
	Long id

	@NotNull
	String title

	@NotNull
	String content

//	LocalDateTime date

}
