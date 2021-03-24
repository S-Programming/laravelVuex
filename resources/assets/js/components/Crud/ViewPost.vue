<template>
    <div>
        <h2>View Post #{{this.$route.params.id}}</h2>
        <br/>
        <div class="ui active dimmer" v-if="showLoader">
            <div class="ui loader"></div>
        </div>

        <div class="ui grid">
            <div class="">
                <p>
                    <strong>Title: </strong><span>{{ this.post.title}}</span>
                </p>
            </div>
            <br/>
            <div>
                <p>
                    <strong>Body: </strong><span>{{ this.post.body}}</span>
                </p>
            </div>
            <br/>
            <div v-if="this.post.photo!=''">
                <p>
                    <strong>Photo: </strong><span><img :src="this.post.photo" width="200" height="180" /></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {

    data() {
        return {
            showLoader: true,
            post: {}
        }
    },
    mounted() {

        let self = this;

        axios.get(BaseUrl + '/posts/view/' + this.$route.params.id)
            .then((result) => {
                self.post = result.data.data;

                self.showLoader = false;
            });
    }
}
</script>
