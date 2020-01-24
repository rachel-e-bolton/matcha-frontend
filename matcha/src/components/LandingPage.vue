<template>
    <div>
        <img alt="Vue logo" class="logo" src="../assets/logo-white.png">
        <div>
            {{ msg }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        msg: String,
    }
}
</script>

<style>

</style>