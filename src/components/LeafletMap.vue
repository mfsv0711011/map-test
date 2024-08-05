<template>
    <div ref="mapContainer" style="width: 600px; height: 600px"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import L from 'leaflet'

const map = ref()
const mapContainer = ref()
const lat = ref()
const long = ref()
const cordsOfUzbekistan = [41.81481063259457, 63.903304491252335]

const buildings = [
    {
        id: 1,
        name: 'Bino 1',
        lat: 38.609874631363766,
        lng: 66.25962717859963,
        info: "Kadastr raqami: 123456, Manzil: Toshkent sh., Amir Temur ko'chasi, 1-uy",
    },
    {
        id: 2,
        name: 'Kadastr raqami: 789012, Manzil: Toshkent sh., Mustaqillik ko\'chasi, 2-uy',
        lat: 41.3115,
        lng: 69.241,
        info: "",
    },
    {
        id: 2,
        name: 'Kadastr raqami: 789012, Manzil: G\'uzor sh., Mustaqillik MFY, 2-uy',
        lat: 41.311081,
        lng: 69.240562,
        info: "",
    },
]
const greenIcon = L.icon({
    iconUrl: '/location.svg',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

function addMarkers() {
    buildings.forEach(building => {
        L.marker([building.lat, building.lng], {draggable: true, icon: greenIcon}).addTo(map.value).bindPopup(building.name)
            .on('dragend', e => {
                console.log(e)
            })
    })
    L.circle([buildings[0].lat, buildings[0].lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 50000
    }).addTo(map.value);
    // L.circleMarker([buildings[0].lat, buildings[0].lng], {radius: 100}).addTo(map.value);
    L.layerGroup(buildings).addTo(map.value);
}


const getGeolocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat.value = position.coords.latitude;
                long.value = position.coords.longitude;
                initializeMap([lat.value, long.value]);
            },
            () => {
                // Agar geolokatsiya rad qilinsa yoki xato bo'lsa
                initializeMap(cordsOfUzbekistan);
            }
        );
    } else {
        // Agar geolokatsiya qo'llab-quvvatlanmasa
        initializeMap(cordsOfUzbekistan);
    }
};

const initializeMap = (coords) => {
    map.value = L.map(mapContainer.value).setView(coords, 6).on("click", e => {
        console.log(e.latlng)
        L.tooltip()
            .setLatLng(e.latlng)
            .setContent('Hello world!<br />This is a nice tooltip.')
            .addTo(map.value);
    });
    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    // }).addTo(map.value);
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map.value);

    addMarkers()
};

onMounted(() => {
    getGeolocation();
});
</script>

<style scoped>

</style>