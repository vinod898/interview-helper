import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

export interface Topic {
    id: string;
    topicName: string;
    icon: string;
    childrens: Topic[];
}

const COLLECTION_NAME = 'settings';
const DOC_ID = 'topics_hierarchy';

export const fetchTopics = async (): Promise<Topic[]> => {
    const db = getFirestore();
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().data as Topic[];
        }
        return [];
    } catch (error) {
        console.error("Error fetching topics:", error);
        return [];
    }
};

export const saveTopics = async (topics: Topic[]): Promise<void> => {
    const db = getFirestore();
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    await setDoc(docRef, { data: topics });
};