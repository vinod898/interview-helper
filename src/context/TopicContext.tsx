import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { fetchTopics, saveTopics, type Topic } from '../services/topicService';

const mockData: Topic[] = [
  {
    "id": "1",
    "topicName": "Programming Languages",
    "icon": "folder",
    "parentId": null,
    "childrens": [
      {
        "id": "1-1",
        "topicName": "Java",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "parentId": "1",
        "childrens": [
          {
            "id": "1-1-1",
            "topicName": "Core Java",
            "icon": "folder",
            "parentId": "1-1",
            "childrens": [
              { "id": "1-1-1-1", "topicName": "OOP Concepts", "icon": "file", "parentId": "1-1-1", "childrens": [] },
              { "id": "1-1-1-2", "topicName": "Collections Framework", "icon": "file", "parentId": "1-1-1", "childrens": [] },
              { "id": "1-1-1-3", "topicName": "Multithreading & Concurrency", "icon": "file", "parentId": "1-1-1", "childrens": [] },
              { "id": "1-1-1-4", "topicName": "Exception Handling", "icon": "file", "parentId": "1-1-1", "childrens": [] },
              { "id": "1-1-1-5", "topicName": "Java I/O & NIO", "icon": "file", "parentId": "1-1-1", "childrens": [] },
              { "id": "1-1-1-6", "topicName": "Generics", "icon": "file", "parentId": "1-1-1", "childrens": [] },
              { "id": "1-1-1-7", "topicName": "Serialization", "icon": "file", "parentId": "1-1-1", "childrens": [] }
            ]
          },
          {
            "id": "1-1-2",
            "topicName": "Java 8+ Features",
            "icon": "folder",
            "parentId": "1-1",
            "childrens": [
              { "id": "1-1-2-1", "topicName": "Lambda Expressions", "icon": "file", "parentId": "1-1-2", "childrens": [] },
              { "id": "1-1-2-2", "topicName": "Stream API", "icon": "file", "parentId": "1-1-2", "childrens": [] },
              { "id": "1-1-2-3", "topicName": "Optional Class", "icon": "file", "parentId": "1-1-2", "childrens": [] },
              { "id": "1-1-2-4", "topicName": "Functional Interfaces", "icon": "file", "parentId": "1-1-2", "childrens": [] },
              { "id": "1-1-2-5", "topicName": "Method References", "icon": "file", "parentId": "1-1-2", "childrens": [] },
              { "id": "1-1-2-6", "topicName": "Default & Static Methods", "icon": "file", "parentId": "1-1-2", "childrens": [] }
            ]
          },
          {
            "id": "1-1-3",
            "topicName": "JVM Internals",
            "icon": "folder",
            "parentId": "1-1",
            "childrens": [
              { "id": "1-1-3-1", "topicName": "Memory Management (Heap/Stack)", "icon": "file", "parentId": "1-1-3", "childrens": [] },
              { "id": "1-1-3-2", "topicName": "Garbage Collection (GC)", "icon": "file", "parentId": "1-1-3", "childrens": [] },
              { "id": "1-1-3-3", "topicName": "Class Loading Subsystem", "icon": "file", "parentId": "1-1-3", "childrens": [] },
              { "id": "1-1-3-4", "topicName": "JIT Compiler", "icon": "file", "parentId": "1-1-3", "childrens": [] },
              { "id": "1-1-3-5", "topicName": "JVM Architecture", "icon": "file", "parentId": "1-1-3", "childrens": [] }
            ]
          },
          {
            "id": "1-1-4",
            "topicName": "Advanced Java",
            "icon": "folder",
            "parentId": "1-1",
            "childrens": [
              { "id": "1-1-4-1", "topicName": "Reflection API", "icon": "file", "parentId": "1-1-4", "childrens": [] },
              { "id": "1-1-4-2", "topicName": "Annotations", "icon": "file", "parentId": "1-1-4", "childrens": [] },
              { "id": "1-1-4-3", "topicName": "JDBC", "icon": "file", "parentId": "1-1-4", "childrens": [] },
              { "id": "1-1-4-4", "topicName": "Networking (Sockets)", "icon": "file", "parentId": "1-1-4", "childrens": [] }
            ]
          },
          {
            "id": "1-1-5",
            "topicName": "Design Patterns in Java",
            "icon": "folder",
            "parentId": "1-1",
            "childrens": [
              { "id": "1-1-5-1", "topicName": "Singleton Pattern", "icon": "file", "parentId": "1-1-5", "childrens": [] },
              { "id": "1-1-5-2", "topicName": "Factory Pattern", "icon": "file", "parentId": "1-1-5", "childrens": [] },
              { "id": "1-1-5-3", "topicName": "Observer Pattern", "icon": "file", "parentId": "1-1-5", "childrens": [] },
              { "id": "1-1-5-4", "topicName": "Builder Pattern", "icon": "file", "parentId": "1-1-5", "childrens": [] },
              { "id": "1-1-5-5", "topicName": "Decorator Pattern", "icon": "file", "parentId": "1-1-5", "childrens": [] }
            ]
          }
        ]
      },
      { "id": "1-2", "topicName": "Python", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", "parentId": "1", "childrens": [] },
      { "id": "1-3", "topicName": "JavaScript", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", "parentId": "1", "childrens": [] },
      { "id": "1-4", "topicName": "TypeScript", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", "parentId": "1", "childrens": [] },
      { "id": "1-5", "topicName": "C#", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", "parentId": "1", "childrens": [] },
      { "id": "1-6", "topicName": "C++", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", "parentId": "1", "childrens": [] },
      { "id": "1-7", "topicName": "Go", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", "parentId": "1", "childrens": [] },
      { "id": "1-8", "topicName": "Rust", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg", "parentId": "1", "childrens": [] },
      { "id": "1-9", "topicName": "Kotlin", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", "parentId": "1", "childrens": [] },
      { "id": "1-10", "topicName": "Swift", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", "parentId": "1", "childrens": [] }
    ]
  },
  {
    "id": "2",
    "topicName": "Frontend",
    "icon": "folder",
    "parentId": null,
    "childrens": [
      { "id": "2-1", "topicName": "HTML", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", "parentId": "2", "childrens": [] },
      { "id": "2-2", "topicName": "CSS", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", "parentId": "2", "childrens": [] },
      { "id": "2-3", "topicName": "React", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", "parentId": "2", "childrens": [] },
      { "id": "2-4", "topicName": "Angular", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", "parentId": "2", "childrens": [] },
      { "id": "2-5", "topicName": "Vue", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", "parentId": "2", "childrens": [] },
      { "id": "2-6", "topicName": "Next.js", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", "parentId": "2", "childrens": [] }
    ]
  },
  {
    "id": "3",
    "topicName": "Backend",
    "icon": "folder",
    "parentId": null,
    "childrens": [
      { "id": "3-1", "topicName": "Node.js", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", "parentId": "3", "childrens": [] },
      { "id": "3-2", "topicName": "Spring Boot", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", "parentId": "3", "childrens": [] },
      { "id": "3-3", "topicName": "Django", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", "parentId": "3", "childrens": [] },
      { "id": "3-4", "topicName": ".NET Core", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg", "parentId": "3", "childrens": [] },
      { "id": "3-5", "topicName": "Express.js", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", "parentId": "3", "childrens": [] }
    ]
  },
  {
    "id": "4",
    "topicName": "Databases",
    "icon": "folder",
    "parentId": null,
    "childrens": [
      { "id": "4-1", "topicName": "MySQL", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", "parentId": "4", "childrens": [] },
      { "id": "4-2", "topicName": "PostgreSQL", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", "parentId": "4", "childrens": [] },
      { "id": "4-3", "topicName": "MongoDB", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", "parentId": "4", "childrens": [] },
      { "id": "4-4", "topicName": "Oracle", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", "parentId": "4", "childrens": [] },
      { "id": "4-5", "topicName": "Redis", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", "parentId": "4", "childrens": [] }
    ]
  },
  {
    "id": "5",
    "topicName": "DevOps & Cloud",
    "icon": "folder",
    "parentId": null,
    "childrens": [
      { "id": "5-1", "topicName": "AWS", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", "parentId": "5", "childrens": [] },
      { "id": "5-2", "topicName": "Azure", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", "parentId": "5", "childrens": [] },
      { "id": "5-3", "topicName": "Google Cloud", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", "parentId": "5", "childrens": [] },
      { "id": "5-4", "topicName": "Docker", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", "parentId": "5", "childrens": [] },
      { "id": "5-5", "topicName": "Kubernetes", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", "parentId": "5", "childrens": [] },
      { "id": "5-6", "topicName": "CI/CD", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg", "parentId": "5", "childrens": [] }
    ]
  },
  {
    "id": "6",
    "topicName": "Data & AI",
    "icon": "folder",
    "parentId": null,
    "childrens": [
      { "id": "6-1", "topicName": "Machine Learning", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", "parentId": "6", "childrens": [] },
      { "id": "6-2", "topicName": "Deep Learning", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", "parentId": "6", "childrens": [] },
      { "id": "6-3", "topicName": "Data Science", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", "parentId": "6", "childrens": [] },
      { "id": "6-4", "topicName": "TensorFlow", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", "parentId": "6", "childrens": [] },
      { "id": "6-5", "topicName": "PyTorch", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", "parentId": "6", "childrens": [] }
    ]
  }
];

interface TopicContextType {
    topics: Topic[];
    loading: boolean;
    error: string | null;
    refreshTopics: () => Promise<void>;
    updateTopics: (newTopics: Topic[]) => Promise<void>;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export const useTopic = () => {
    const context = useContext(TopicContext);
    if (!context) {
        throw new Error('useTopic must be used within a TopicProvider');
    }
    return context;
};

export const TopicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refreshTopics = async () => {
        setLoading(true);
        try {
            const data = await fetchTopics();
            if (data && data.length > 0) {
                setTopics(data);
            } else {
            //    await clearTopics();
               
            //    const topicsWithUUIDs = JSON.parse(JSON.stringify(mockData));
            //    const updateIds = (nodes: Topic[], parentId: string | null) => {
            //        nodes.forEach(node => {
            //            node.id = crypto.randomUUID();
            //            node.parentId = parentId;
            //            if (node.childrens) {
            //                updateIds(node.childrens, node.id);
            //            }
            //        });
            //    };
            //    updateIds(topicsWithUUIDs, null);

            //    await saveTopics(topicsWithUUIDs);
            //    setTopics(topicsWithUUIDs);

            }
            setError(null);
        } catch (err: any) {
            console.error("Error fetching topics:", err);
            setTopics(mockData);
        } finally {
            setLoading(false);
        }
    };

    const updateTopics = async (newTopics: Topic[]) => {
        const previousTopics = topics;
        setTopics(newTopics);
        try {
            await saveTopics(newTopics);
        } catch (err: any) {
            setTopics(previousTopics);
            setError(err.message || 'Failed to save topics');
            throw err;
        }
    };

    useEffect(() => {
        refreshTopics();
    }, []);

    return (
        <TopicContext.Provider value={{ topics, loading, error, refreshTopics, updateTopics }}>
            {children}
        </TopicContext.Provider>
    );
};