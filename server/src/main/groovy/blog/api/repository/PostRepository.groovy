package blog.api.repository

import blog.api.config.PostConfiguration
import blog.api.domains.Post
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoCollection
import jakarta.inject.Inject
import jakarta.inject.Singleton

@Singleton
class PostRepository {

    @Inject PostConfiguration postConfig
    @Inject MongoClient mongoClient

    List<Post> findAll() {
        return getCollection().find().into([])
    }
    
    private MongoCollection<Post> getCollection() {
        return mongoClient.getDatabase(postConfig.name).getCollection(postConfig.collection, Post)
    }
}
