package blog.api.repository

import blog.api.config.CommentConfiguration
import blog.api.domains.Comment
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Updates
import jakarta.inject.Inject
import jakarta.inject.Singleton
import org.bson.Document

@Singleton
class CommentRepository {

    @Inject CommentConfiguration commentConfig
    @Inject MongoClient mongoClient

    List<Comment> findAll(String postPath) {
        Document query = new Document("postPath", postPath)
        return getCollection().find(query).into([])
    }

    void save(Comment comment) {
        collection.insertOne(comment)
    }

    void add(Comment comment) {
        Document query = new Document(
            [postPath: comment.postPath, email: comment.parent.email, date: comment.parent.date]
        )
        collection.updateOne(query, Updates.push("replies", comment))
    }
    
    private MongoCollection<Comment> getCollection() {
        return mongoClient.getDatabase(commentConfig.name).getCollection(commentConfig.collection, Comment)
    }

}
