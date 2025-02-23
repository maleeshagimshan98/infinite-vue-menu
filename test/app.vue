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
import MenuStyles from "../src/MenuStyles";

const styles = new MenuStyles({
    container : ['item-container'],
    item: {
        base: ['base-item'],
        idle: ['item-idle'],
        active: ['item-active'],
        disable: ['item-disable'],
        children: ['item-child'],
        childrenWrapper : ['item-child-wrapper'],
    },
    text: {
        base: ['base-text'],
        idle: ['text-idle'],
        active: ['text-active'],
        disable: ['text-disable'],
        children: ['text-child'],
    }
})

export default {
    data() {
        let items = {
            home: {
                id: 'home',
                title: 'Home',
                styles: new MenuStyles({
                    container : [],
                    item: {
                        base: ['home-base'],
                        idle: ['home-item-idle'],
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
                }),
            },
            profile: {
                id: "profile",
                title: 'User Profile',
                children: {
                    view: {
                        id: 'viwe',
                        title: "View profile",                        
                    },
                    edit: {
                        id: 'edit',
                        title: "Edit profile",
                        children: {
                            deepChild: {
                                id: 'deepchild',
                                title: 'Deep Child'
                            },
                            deepChild2: {
                                id: 'deepchild2',
                                title: 'Deep Child 2'
                            },
                            deepChild3: {
                                id: 'deepchild3',
                                title: 'Deep Child 3',
                                closeOnClick : false
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

/* Base styles for menu items */
.base-item {
    padding: 15px 0px 15px 10px;    
    border: none;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    list-style: none;    
    width: 200px;
    transition: background-color 0.1s, color 0.1s, box-shadow 0.1s;
    border-radius: 4px;    
}

.base-item:hover {
    background-color: #f1f1f1;
}

.item-idle {
    background-color: #fff;
    color: #333;
}

.item-active {
    background-color: #6200ea;
    color: #fff;
}

.item-active:hover {
    background-color: #4a03ad;
    color: #fff;
}

.item-disable {
    background-color: #e0e0e0;
    color: #a0a0a0;
    cursor: not-allowed;
}

.item-child {
    padding-left: 20px;
}

.item-container {
    box-shadow: 0 0px 4px rgba(202, 202, 202, 0.534);
}

/* Base styles for menu text */
.base-text {
    padding: 2px 5px;
    font-size: 14px;
    font-weight: normal;
}

.text-idle {
    color: #333;
}

.text-active {
    color: #fff;
}

.text-disable {
    color: #a0a0a0;
}

.text-child {
    font-size: 12px;
}

/* Specific styles for 'home' menu item */
.home-base {
    background-color: #f0f0f0;
}

.home-item-active {
    background-color: #28a745;
    color: #fff;
}

.home-item-disable {
    background-color: #d0d0d0;
    color: #909090;
}

.home-item-child {
    padding-left: 30px;
}

.home-text-idle {
    color: #555;
}

.home-text-active {
    color: #fff;
}

.home-text-disable {
    color: #909090;
}

.home-text-child {
    font-size: 13px;
}
</style>