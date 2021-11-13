import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FirestoreService {

	constructor(private firestore: AngularFirestore) {
		this.firestore.collection('posts').snapshotChanges().subscribe((posts) => {
			console.log('---', posts);
			posts.forEach(post => {
				console.log('post', post.payload.doc.data());
			});
		});
	}

	getPosts(): Observable<any[]> {
		return this.firestore.collection('posts').valueChanges();
	}

}
