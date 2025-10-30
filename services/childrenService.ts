import { 
  collection, 
  addDoc, 
  getDocs, 
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface Child {
  id?: string;
  name: string;
  avatar: string;
  parentId: string;
  age: number;
  createdAt: Date | Timestamp;
}

export const childrenService = {
  // Get children by parent ID
  async getChildrenByParent(parentId: string): Promise<Child[]> {
    try {
      const childrenRef = collection(db, 'children');
      const q = query(childrenRef, where('parentId', '==', parentId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Child));
    } catch (error: any) {
      console.error('Get children by parent error:', error);
      throw new Error(error.message);
    }
  },

  // Create child profile
  async createChild(child: Omit<Child, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'children'), {
        ...child,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error: any) {
      console.error('Create child error:', error);
      throw new Error(error.message);
    }
  },

  // Update child profile
  async updateChild(childId: string, data: Partial<Child>): Promise<void> {
    try {
      const childRef = doc(db, 'children', childId);
      await updateDoc(childRef, data);
    } catch (error: any) {
      console.error('Update child error:', error);
      throw new Error(error.message);
    }
  },

  // Delete child profile
  async deleteChild(childId: string): Promise<void> {
    try {
      const childRef = doc(db, 'children', childId);
      await deleteDoc(childRef);
    } catch (error: any) {
      console.error('Delete child error:', error);
      throw new Error(error.message);
    }
  }
};
