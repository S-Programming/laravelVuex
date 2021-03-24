<template>
    <div>
        <h2>Post listing</h2>

        <search></search>

        <vuetable ref="vuetable"
                  :per-page="10"
                  :api-url="api_url"
                  :fields="fields"
                  :sort-order="sortOrder"
                  :append-params="searchParams"
                  @vuetable:pagination-data="onPaginationData"
        ></vuetable>

        <div class="vuetable-pagination ui basic segment grid">
            <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>

            <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
        </div>

    </div>
</template>

<script>

import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import axios from 'axios'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import Search from '../Partials/Search.vue'
import Actions from '../Partials/Actions.vue'

Vue.component('search', Search)
Vue.component('actions', Actions)

export default {
    components: {
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo
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
                },
                {
                    name: '__component:actions',
                    title: 'Actions',
                    titleClass: 'center aligned',
                    dataClass: 'center aligned'
                }
            ],
            searchParams: {}
        }
    },
    mounted() {
        this.$events.on('do-filter', eventData => { this.doFilter(eventData) });
        this.$events.on('reset-filter', e => { this.resetFilter() });
        this.$events.on('delete-post', eventData => { this.deletePost(eventData) });
    },
    methods: {
        doFilter(data) {

            this.searchParams = {
                'filter': data
            }

            Vue.nextTick( () => this.$refs.vuetable.refresh());
        },
        resetFilter() {

            this.searchParams = {}

            Vue.nextTick( () => this.$refs.vuetable.refresh())
        },
        deletePost(data) {
            let self = this;

            let token = document.head.querySelector('meta[name="csrf-token"]');

            if(confirm('Are you sure?')) {
                axios.delete(BaseUrl + '/posts/delete?id=' + data.id + "&_token=" + token.content, { withCredentials: true })
                    .then((result) => {
                        self.afterDelete(result);
                    });
            }
        },
        afterDelete(result) {
            Vue.nextTick( () => this.$refs.vuetable.refresh());
        },
        displayImageTag(value) {
            if(value != null) {
                return '<img src="' + window.BaseUrl + '/uploads/' + value + '" width="100" height="70" />'
            }
        },
        onPaginationData (paginationData) {
            this.$refs.pagination.setPaginationData(paginationData)
            this.$refs.paginationInfo.setPaginationData(paginationData)
        },
        onChangePage (page) {
            this.$refs.vuetable.changePage(page)
        }
    }
}
</script>
