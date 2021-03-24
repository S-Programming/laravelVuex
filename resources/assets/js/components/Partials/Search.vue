<template>
    <div class="filter-bar ui basic segment grid">
        <div class="ui form">
            <div class="inline field">
                <label>Search for:</label>
                <input type="text" v-model="searchQuery" class="three wide column" @keyup.enter="filter" placeholder="title">
                <button class="ui primary button" @click="filter">Go</button>
                <button class="ui button" @click="reset">Reset</button>
            </div>
        </div>

        <router-link to="/create/" class="ui primary button four wide column right floated">
            <i class="plus icon"></i> Create new
        </router-link>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchQuery: ''
        }
    },
    methods: {
        filter () {
            this.$events.fire('do-filter', this.searchQuery);
        },
        reset () {
            this.searchQuery = ''
            this.$events.fire('reset-filter');
        }
    }
}
</script>
