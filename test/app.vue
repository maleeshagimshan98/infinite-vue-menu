<template>
    <div class="app">
        <app :items="items"></app>
    </div>
</template>

<script>
import app from "../src/Menu.vue"

export default {
    data() {
        let items = {
            home: {
                routeName: "home"
            },
            profile: {
                title: 'User Profile',
                path: "/profile",
                children: {
                    edit: {
                        title: "Edit profile",
                        path: "/profile/edit",
                        params: {
                            userId: 1100,
                            name: "test"
                        },
                        children: {
                            deepChild: {
                                path: "/profile/deep",
                                params: {
                                    deeep: "deeeeeep,  very deep"
                                }
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