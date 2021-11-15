package blog.api.domains

import blog.api.utils.Constants
import com.fasterxml.jackson.annotation.JsonFormat
import io.micronaut.data.annotation.GeneratedValue
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity

import javax.validation.constraints.NotNull
import java.time.LocalDateTime

@MappedEntity
class Post {

	@Id
	@GeneratedValue(GeneratedValue.Type.AUTO)
	Long id

	@NotNull
	String title

	@NotNull
	String content

	@JsonFormat(pattern = Constants.DateTimeFormat.yyyy_MM_dd_HH_mm_ss, timezone = Constants.SPAIN_TIMEZONE)
	LocalDateTime date

}
