import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  increment,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/config/firebase';

export interface Story {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  category: string;
  createdAt: Date | Timestamp;
  likes: number;
  views: number;
}

export const storiesService = {
  // Get all stories
  async getAllStories(): Promise<Story[]> {
    try {
      const storiesRef = collection(db, 'stories');
      const q = query(storiesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Story));
    } catch (error: any) {
      console.error('Get all stories error:', error);
      throw new Error(error.message);
    }
  },

  // Get story by ID
  async getStoryById(storyId: string): Promise<Story | null> {
    try {
      const storyDoc = await getDoc(doc(db, 'stories', storyId));
      if (storyDoc.exists()) {
        return { id: storyDoc.id, ...storyDoc.data() } as Story;
      }
      return null;
    } catch (error: any) {
      console.error('Get story by ID error:', error);
      throw new Error(error.message);
    }
  },

  // Get stories by category
  async getStoriesByCategory(category: string): Promise<Story[]> {
    try {
      const storiesRef = collection(db, 'stories');
      const q = query(
        storiesRef, 
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Story));
    } catch (error: any) {
      console.error('Get stories by category error:', error);
      throw new Error(error.message);
    }
  },

  // Get top picks (most liked stories)
  async getTopPicks(limitCount: number = 10): Promise<Story[]> {
    try {
      const storiesRef = collection(db, 'stories');
      const q = query(
        storiesRef, 
        orderBy('likes', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Story));
    } catch (error: any) {
      console.error('Get top picks error:', error);
      throw new Error(error.message);
    }
  },

  // Create new story
  async createStory(story: Omit<Story, 'id' | 'createdAt' | 'likes' | 'views'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'stories'), {
        ...story,
        createdAt: Timestamp.now(),
        likes: 0,
        views: 0
      });
      return docRef.id;
    } catch (error: any) {
      console.error('Create story error:', error);
      throw new Error(error.message);
    }
  },

  // Upload story image
  async uploadStoryImage(uri: string, storyId: string): Promise<string> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const storageRef = ref(storage, `stories/${storyId}/${Date.now()}.jpg`);
      await uploadBytes(storageRef, blob);
      
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error: any) {
      console.error('Upload story image error:', error);
      throw new Error(error.message);
    }
  },

  // Increment story views
  async incrementViews(storyId: string): Promise<void> {
    try {
      const storyRef = doc(db, 'stories', storyId);
      await updateDoc(storyRef, {
        views: increment(1)
      });
    } catch (error: any) {
      console.error('Increment views error:', error);
      throw new Error(error.message);
    }
  },

  // Toggle like
  async toggleLike(storyId: string, userId: string, isLiked: boolean): Promise<void> {
    try {
      const storyRef = doc(db, 'stories', storyId);
      
      if (isLiked) {
        // Unlike
        await updateDoc(storyRef, {
          likes: increment(-1)
        });
      } else {
        // Like
        await updateDoc(storyRef, {
          likes: increment(1)
        });
      }
    } catch (error: any) {
      console.error('Toggle like error:', error);
      throw new Error(error.message);
    }
  }
};
