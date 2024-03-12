"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
 {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 });

let map = L.map("map", {
    center: [50,-100],
    zoom: 3.5
});

basemap.addTo(map)

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(data => {

    function styleInfo(feature) {
        return {
            opacity:1,
            color:"black",
            fillOpacity: 1,
            fillColor: "blue",
            fillColor:getColor(feature.geometry.coordinates[2]),
            radius: getMag(feature.properties.mag),
            weight:0.5
        }
    }
    
    function getColor(depth) {
        if (depth >100) {
            return "red"
        }
        else if (depth > 75) {
            return " orange"
        }
        else if (depth >50){
            return "yellow"
        }
        else if (depth >25) {
            return "green"
        }
        return "white"
    }

    function getMag(mag) {
        if (mag == 0 ) {
            return 1
        }
        return mag*2.5
    }

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng)
        },
        style:styleInfo,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "magnitude: " +feature.properties.mag
                + "<br>Depth: " +feature.geometry.coordinates[2]
                +"<br>Location: " +feature.properties.place
            );
        }
    }).addTo(map)


});


