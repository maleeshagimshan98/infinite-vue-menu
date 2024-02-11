<template>
    <div class="app">
        <app :items="items" :styles="styles">
            <template #activator="{ state }">
                <button class="" v-on:click="state.toggleMenu()"> menu </button>
            </template>
        </app>
    </div>
</template>

<script>
import app from "../src/Menu.vue"

const styles = {
    item: {
        idle: ['item-idle'],
        active: ['item-active'],
        disable: ['itemdisable'],
    },
    text: {
        idle: ['text-idle'],
        active: ['text-active'],
        disable: ['text-disable'],
    }
}

export default {
    data() {
        let items = {
            home: {
                id: 'home',
                title: 'Home'
            },
            profile: {
                id: "profile",
                title: 'User Profile',
                children: {
                    edit: {
                        id: 'edit',
                        title: "Edit profile",
                        children: {
                            deepChild: {
                                id: 'deepchild',
                                title: 'Deep Child'
                            }
                        }
                    }
                }
            },
            settings: {
                id: 'settings',
                title: 'Settings',
                closeOnClick: false
            },
        }
        return {
            styles : styles,
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