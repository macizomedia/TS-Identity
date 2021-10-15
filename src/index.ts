import { api } from './utils.js';
import { Activity, Idea, Project, State, Subject, Group, Post } from './types';
import { ActiveSubject, activeUser } from './user-services.js';
import { http, httpGet } from './http.js';

const BASE_URL = 'localhost:3000';

let User = new httpGet(
    'localhost:3000/user',
    '3c75279a-5815-423d-afa6-c1cf21348736',
    {}
);

let Groups = new httpGet(BASE_URL, 'groups', {});

Groups.init();

setTimeout(() => {
    let placeholder = Groups.response;
    console.log(placeholder);
}, 4000);
