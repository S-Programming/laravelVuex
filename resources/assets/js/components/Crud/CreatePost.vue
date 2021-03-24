<template>
    <div>
        <h2>Create Post</h2>
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
            showLoader: false
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
            if(this.$store.state.photoObj == "") {
                this.errors.push("Photo required");
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
            const formData = new FormData();
            formData.append('title', self.$store.state.title);
            formData.append('body', self.$store.state.body);
            formData.append('photo', self.$store.state.photoObj, self.$store.state.photoObj.name)
            axios.post(BaseUrl + '/posts/create', formData, { withCredentials: true })
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
    }
}
</script>
