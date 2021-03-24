import CreatePost from './components/Crud/CreatePost.vue';
import EditPost from './components/Crud/EditPost.vue';
import ViewPost from './components/Crud/ViewPost.vue';
import ListPosts from './components/Crud/ListPosts.vue';
export const routes = [
    {path: '/list/', name: 'listPosts', component: ListPosts},
    {path: '/create/', name: 'createPost', component: CreatePost},
    {path: '/edit/:id', name: 'editPost', component: EditPost},
    {path: '/view/:id', name: 'viewPost', component: ViewPost}
];
