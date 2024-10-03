<script setup>
import { reactive } from 'vue';
import InputNew from './InputNew.vue';  

let boards = reactive([
    {
        id: crypto.randomUUID(),
        name: 'Inicio',
        items: [
            {
                id: crypto.randomUUID(),
                title: 'Bienvenido'
            }
        ]
    },
    {
        id: crypto.randomUUID(),
        name: 'Desarrollo',
        items: []
    },
    {
        id: crypto.randomUUID(),
        name: 'Termino',
        items: []
    }
]);

function handleNewItem(text, board) {
    board.items.push({
        id: crypto.randomUUID(),
        title: text, 
    });
}

function HandleNewBoard (){
    const name = prompt("Name of the boards");
    if (name) {
        boards.push({
            id: crypto.randomUUID(),
            name: name,
            items: [],
        });
    }
}

function startDrag(evt, board, item) {
    evt.dataTransfer.setData('text/plain', JSON.stringify({ boardId: board.id, itemId: item.id }));
}

function onDrop(evt, dest) {
    const { boardId, itemId } = JSON.parse(evt.dataTransfer.getData('text/plain'));

    const originBoard = boards.find((item) => item.id === boardId);
    const originItem = originBoard.items.find((item) => item.id === itemId);

    dest.items.push({ ...originItem });
    originBoard.items = originBoard.items.filter((item) => item !== originItem);
}

// Nueva función para eliminar un item
function handleDeleteItem(board, item) {
    board.items = board.items.filter((i) => i.id !== item.id);
}

</script>
<template>
    <nav>
        <ul>
            <li><a href="#" @click.prevent="HandleNewBoard">Crear Tablero</a></li>
        </ul>
    </nav>
    
    <div class="boards-containers">
        <div class="boards">
            <div class="board"
                 @drop="onDrop($event, board)"
                 @dragover.prevent
                 @dragenter.prevent
                 v-for="board in boards"
                 :key="board.id"
            >
                <div class="titulos">{{ board.name }}</div>
                <InputNew @on-new-item="(text) => handleNewItem(text, board)" />  
                <div class="items">
                    <div class="item"
                         draggable="true"
                         @dragstart="startDrag($event, board, item)"
                         v-for="item in board.items" 
                         :key="item.id">
                        <div class="item-content"> 
                            <span>{{ item.title }}</span>
                            <button @click="handleDeleteItem(board, item)">X</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <style scoped>
    nav {
        background-color: black;
        margin-bottom: 10px;
    }
    
    nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
    }
    
    nav ul li a {
        display: block;
        padding: 10px;
        color: white;
        text-decoration: none;
    }
    
    .boards {
        display: flex;
        gap: 10px;
    }
    
    .board {
        background-color: #efefef;
        padding: 10px;
    }
    
    .items {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    .item {
        background-color: white;
        padding: 10px;
        box-sizing: border-box;
    }
    
    .item-content {
        display: flex;  
        justify-content: space-between; 
        align-items: center;  
    }

    .titulos{
        text-align: center;
        
    }
    </style>