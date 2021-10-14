import { api } from './user-services.js';
import { Activity, Idea, Project, State, Subject, Group, Post } from './types';

// Consumer
api<any[]>('https://jsonplaceholder.typicode.com/posts')
    .then((arr) => {
        console.log(arr);
    })
    .catch((error) => {
        console.log(error);
    });

console.log('there is something...');
