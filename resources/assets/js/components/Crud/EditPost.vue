<template>
    <div>
        <h2>Edit Post #{{this.$route.params.id}}</h2>

        <ul v-if="this.errors.length > 0" class="ui negative message">
            <li v-for="val in this.errors">{{ val }}</li>
        </ul>

        <div v-if="this.success!=''" class="ui positive message">
            {{ this.success }}
        </div>

        <div class="ui active dimmer" v-if="showLoader">
            <div class="ui loader"></div>
        </div>

        <form class="ui form" method="post" v-on:submit.prevent="submit" enctype="multipart/form-data">
            <div class="field" v-bind:class="{error: this.titleClass}">
                <label>Title</label>
                <input type="text" name="title" placeholder="Title" v-model="title">
            </div>
            <div class="field" v-bind:class="{error: this.bodyClass}">
                <label>Body</label>
                <textarea name="body" placeholder="Body" v-model="body"></textarea>
            </div>
            <div class="field">
                <img v-if="this.$store.state.photo!=''" :src="photoUrl" width="100" height="80" />
                <label>Photo</label>
                <input type="file" name="photo" @change="onFileChanged">
            </div>
            <button class="ui button primary" type="submit">Submit</button>
            <router-link to="/list" class="ui button">Close</router-link>
        </form>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            errors: [],
            titleClass: false,
            bodyClass: false,
            success: "",
            showLoader: false,
            photoUrl: ""
        }
    },
    methods: {
        submit(event) {

            let self = this;

            this.errors = [];

            if(this.$store.state.title == "") {
                this.errors.push("Title required");
            }

            if(this.$store.state.body == "") {
                this.errors.push("Body required");
            }

            if(this.$store.state.photoObj != "") {
                var extension = this.$store.state.photoObj.name.split(".")[1];
                if(extension != "jpg" && extension != "jpeg" && extension != "png" && extension != "gif") {
                    this.errors.push("Photo extension invalid");
                }
            }

            if(this.errors.length > 0) {
                return false;
            }

            self.showLoader = true;

            let token = document.head.querySelector('meta[name="csrf-token"]');

            const formData = new FormData();
            formData.append('title', self.$store.state.title);
            formData.append('body', self.$store.state.body);
            formData.append('id', self.$route.params.id);
            formData.append('_token', token.content);

            if(self.$store.state.photoObj != "") {
                formData.append('photo', self.$store.state.photoObj, self.$store.state.photoObj.name);
            }

            setTimeout(() => {
                axios.post(BaseUrl + '/posts/update', formData, { withCredentials: true })
                    .then((result) => {
                        self.success = result.data.msg;

                        self.showLoader = false;

                        self.$store.commit('setTitle', '');
                        self.$store.commit('setBody', '');
                        self.$store.commit('setPhotoObj', '');
                        self.$store.commit('setPhoto', '');

                        setTimeout(()=>{
                            self.$router.push({ path: '/list' })
                        }, 1000);
                    });
            }, 2000);
        },
        onFileChanged(event) {
            const file = event.target.files[0];

            this.$store.commit('setPhotoObj', file);
        }
    },
    computed: {
        title: {
            get() {
                return this.$store.state.title
            },
            set(value) {
                this.$store.commit('setTitle', value)

                if(value == "") {
                    this.titleClass = true;
                } else {
                    this.titleClass = false;
                }
            }
        },
        body: {
            get() {
                return this.$store.state.body;
            },
            set(value) {
                this.$store.commit('setBody', value);

                if(value == "") {
                    this.bodyClass = true;
                } else {
                    this.bodyClass = false;
                }
            }
        }
    },
    mounted() {
        let self = this;

        self.showLoader = true;

        axios.get(BaseUrl + '/posts/view/' + this.$route.params.id)
            .then((result) => {
                let post = result.data.data;

                self.$store.commit('setTitle', post.title);
                self.$store.commit('setBody', post.body);
                self.$store.commit('setPhoto', post.photo);

                self.photoUrl = this.$store.state.photo;

                self.showLoader = false;
            });
    }
}
</script>
