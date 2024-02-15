<template>
    <div class="app">
        <app :closeOnClick="false" :items="items" :styles="styles">
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
        base: ['base-item'],
        idle: ['item-idle'],
        active: ['item-active'],
        disable: ['item-disable'],
        children: ['item-child'],
    },
    text: {
        base: ['base-text'],
        idle: ['text-idle'],
        active: ['text-active'],
        disable: ['text-disable'],
        children: ['text-child'],
    }
}

export default {
    data() {
        let items = {
            home: {
                id: 'home',
                title: 'Home',
                styles: {
                    item: {
                        base: ['home-base'],
                        //idle: ['home-item-idle'],
                        active: ['home-item-active'],
                        disable: ['home-item-disable'],
                        children: ['home-item-child'],
                    },
                    text: {
                        base: ['home-base'],
                        idle: ['home-text-idle'],
                        active: ['home-text-active'],
                        disable: ['home-text-disable'],
                        children: ['home-text-child'],
                    }
                },
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
                closeOnClick: false,
                callback : async ({router, store}) => {
                    console.log(router)
                    console.log(store)
                }
            },
        }
        return {
            styles: styles,
            items: items
        }
    },
    methods: {
        testSlotProps (state) {
            console.log(state)
        },
    },
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