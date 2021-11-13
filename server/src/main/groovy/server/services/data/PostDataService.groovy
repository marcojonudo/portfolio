package server.services.data

import grails.gorm.services.Service
import server.domains.Post

@Service(Post)
interface PostDataService {

	List<Post> findAll()

}
