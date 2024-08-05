<template>
    <yandex-map
        :settings="{
      location: {
        center: [37.617644, 55.755819],
        zoom: 9,
      },
    }"
        height="100vh"
    >
        <yandex-map-default-scheme-layer :settings="{ theme: 'dark' }" />
        <yandex-map-controls :settings="{ position: 'right' }">
            <yandex-map-zoom-control />
        </yandex-map-controls>
    </yandex-map>
</template>

<script setup>
import {
    YandexMap,
    YandexMapControls,
    YandexMapDefaultSchemeLayer,
    YandexMapZoomControl,
} from "vue-yandex-maps";
</script>

<style scoped>
</style>
