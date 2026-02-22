import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export interface QueAns {
    id: string;
    topicId: string;
    question: string;
    answer: string;
    imp: boolean;
    exp: string;
}

const COLLECTION_NAME = 'que-ans';

export const addQuestion = async (question: Omit<QueAns, 'id'>): Promise<QueAns> => {
    const db = getFirestore();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), question);
    return { id: docRef.id, ...question };
};

export const fetchQuestions = async (topicId: string): Promise<QueAns[]> => {
    const db = getFirestore();
    const q = query(collection(db, COLLECTION_NAME), where("topicId", "==", topicId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as QueAns));
};