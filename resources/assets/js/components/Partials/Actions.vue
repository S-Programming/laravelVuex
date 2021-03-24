<template>
    <div class="ui buttons">
        <router-link :to="'/view/'+rowData.id" class="ui green button"><i class="zoom icon"></i></router-link>
        <router-link :to="'/edit/'+rowData.id" class="ui orange button"><i class="edit icon"></i></router-link>
        <button class="ui red button" @click="deletePost(rowData)"><i class="delete icon"></i></button>
    </div>
</template>

<script>
export default {
    props: {
        rowData: {
            type: Object,
            required: true
        },
        rowIndex: {
            type: Number
        }
    },
    methods: {
        deletePost (rowData) {
            this.$events.fire('delete-post', rowData);
        }
    }
}
</script>
