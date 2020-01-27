<template>
    <div>
        <div>
            <md-toolbar class="md-transparent">
                <h3 class="md-title">Transparent</h3>
            </md-toolbar>
        </div>
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