import { getFirestore, doc, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore';

export interface Topic {
    id: string;
    topicName: string;
    icon: string;
    parentId: string | null;
    childrens: Topic[];
}

const COLLECTION_NAME = 'topics';

export const fetchTopics = async (): Promise<Topic[]> => {
    const db = getFirestore();
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const flatTopics: Topic[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Fetched topic from Firestore:", { id: doc.id, ...data });
            flatTopics.push({
                id: doc.id,
                topicName: data.topicName,
                icon: data.icon,
                parentId: data.parentId || null,
                childrens: []
            });
        });

        const topicMap = new Map<string, Topic>();
        flatTopics.forEach(t => topicMap.set(t.id, t));

        const rootTopics: Topic[] = [];
        flatTopics.forEach(t => {
            if (t.parentId) {
                const parent = topicMap.get(t.parentId);
                if (parent) {
                    parent.childrens.push(t);
                } else {
                    rootTopics.push(t);
                }
            } else {
                rootTopics.push(t);
            }
        });

        return rootTopics;
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            console.warn("Firestore permission denied. Falling back to mock data.");
            return [];
        }
        console.error("Error fetching topics:", error);
        return [];
    }
};

export const saveTopics = async (topics: Topic[]): Promise<void> => {
    const db = getFirestore();
    
    const flatTopics: any[] = [];
    const flatten = (nodes: Topic[], parentId: string | null) => {
        nodes.forEach(node => {
            const { childrens, ...rest } = node;
            flatTopics.push({ ...rest, parentId });
            if (childrens) flatten(childrens, node.id);
        });
    };
    flatten(topics, null);

    const promises = flatTopics.map(t => setDoc(doc(db, COLLECTION_NAME, t.id), t));

    try {
        await Promise.all(promises);
    } catch (error) {
        console.error("Error saving topics:", error);
        throw error;
    }
};

export const clearTopics = async (): Promise<void> => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();
};