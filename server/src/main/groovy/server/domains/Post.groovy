package server.domains

import grails.gorm.annotation.Entity
import org.grails.datastore.gorm.GormEntity

import java.time.LocalDateTime

@Entity
class Post implements GormEntity<Post> {

	String title
	String content
	LocalDateTime date

}
