<template>
    <div class="app">
        <app :items="items">
            <template #activator="{state}" >
                <button class="" v-on:click="state.toggleMenu()"> menu </button>
            </template>
        </app>
    </div>
</template>

<script>
import app from "../src/Menu.vue"

export default {
    data() {
        let items = {
            home: {
                id : 'home',
                title : 'Home'                
            },
            profile: {
                id : "profile",
                title: 'User Profile',
                children: {
                    edit: {
                        id : 'edit',
                        title: "Edit profile",
                        children: {
                            deepChild: {
                                id : 'deepchild',
                                title : 'Deep Child'
                            }
                        }
                    }
                }
            }
        }
        return {
            items: items
        }
    },
    methods: {},
    components: {
        app
    }
}
</script>
>

<style>
.app {
    margin: 10%;
    padding: 10%
}
</style>