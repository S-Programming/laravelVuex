<template>
    <div>
        <h2>Post listing</h2>

        <vuetable ref="vuetable"
                  :per-page="10"
                  :api-url="api_url"
                  :fields="fields"
                  :sort-order="sortOrder"
        ></vuetable>

    </div>
</template>

<script>

import Vue from 'vue'
import Vuetable from 'vuetable-2'
import axios from 'axios'

export default {
    components: {
        Vuetable
    },
    data () {
        return {
            api_url: window.BaseUrl + '/posts/all',
            sortOrder: [
                {
                    field: 'id',
                    sortField: 'id',
                    direction: 'asc'
                }
            ],
            fields: [
                {
                    name: 'id',
                    sortField: 'id',
                    titleClass: 'center aligned'
                },
                {
                    name: 'title',
                    sortField: 'title',
                    titleClass: 'center aligned'
                },
                {
                    name: 'photo',
                    titleClass: 'center aligned',
                    callback: 'displayImageTag'
                }
            ]
        }
    },
    mounted() {

    },
    methods: {
        displayImageTag(value) {
            if(value != null) {
                return '<img src="' + window.BaseUrl + '/uploads/' + value + '" width="100" height="70" />'
            }
        }
    }
}
</script>
