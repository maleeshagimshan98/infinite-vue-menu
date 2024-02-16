<template>
    <div class="app">
        <Menu :closeOnClick="false" :state="state" :activateOnHover="true">
            <template #activator>
                <button class="" v-on:click="state.toggleMenu()"> menu </button>
            </template>
        </Menu>
    </div>
</template>

<script>
import {Menu, MenuState} from "../src/index.js"

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
            state : new MenuState(items,styles)
        }
    },
    methods: {
        testSlotProps (state) {
            console.log(state)
        },
    },
    components: {
        Menu
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