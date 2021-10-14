import { NewUser } from './user-services';
import * as data from './data.json';

let TheArepas = {
    name: 'arepas',
    createdAt: Date.now(),
    description: 'something',
    id: 23,
    isPrivate: false,
    profile: '',
    updatedAt: 0,
};
let TheEmpanadas = {
    name: 'empanadas',
    createdAt: Date.now(),
    description: 'Taste like the caribbean',
    id: 33,
    isPrivate: true,
    profile: '',
    updatedAt: 0,
};
let TheTamales = {
    name: 'tamales',
    createdAt: Date.now(),
    description: 'Taste like yukatan',
    id: 43,
    isPrivate: false,
    profile: '',
    updatedAt: 0,
};
const Guest23 = new NewUser('Blas');

console.log(Guest23.getByProperty('isPrivate', true))
