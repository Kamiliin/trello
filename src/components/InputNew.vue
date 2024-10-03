<script setup>
import { ref, defineEmits } from 'vue';

const text = ref("");

const emits = defineEmits(["onNewItem"]);

function handleSubmit() {
    // Verificar si el texto no está vacío
    if (text.value !== '') {
        // Emitir el evento con el valor del texto
        emits("onNewItem", text.value);
        // Limpiar el valor del input
        text.value = " ";
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="text">
    </form>
</template>

<style scoped>

    form{
        margin-bottom: 10px;
    }

    input{
        width: 100%;
        box-sizing: border-box;
    }
</style>
