//Get your data set
var earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


function createMap(earthquakeData) {
    //Create layer
        var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            maxZoom: 18,
            id: "mapbox/light-v10",
            accessToken: API_KEY
        });
    
    
    //Create a baseMaps object to hold layers
        var baseMap = {
            "Light Map": lightMap
        };
    
    // Create an overlayMaps object to hold the earthquakedata layer
        var overlayMap = {
            Earthquakes: earthquakeData
        };
    
    // Create the map object with options
        var map = L.map('map', {
            center: [10,10],
            zoom: 12,
            layers: [lightMap, earthquakeData]
        })
    
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
        L.control.layers(baseMap, overlayMap, {
            collapsed: false
            }).addTo(map);
    
    }

//pull in data and create criteria functions
    function createMarkers(response) {
        console.log(response)

    //pull in earthquake data
    var earthquakes = response.features
    console.log(earthquakes)

    //initialize array
    earthquakeMarkers = []
    //loop through earthquake array
    for (var i = 0; i < earthquakes.length; i ++) {
        var earthquake = earthquakes[i]
        var earthquakeMarker = L.marker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[2]], {
            radius: markerSize,
            color: markerColor,
            fillOpacity: 1,
            });
        //add markers to array
        earthquakeMarkers.push(earthquakeMarker)
    }

    createMap(L.layerGroup(earthquakeMarkers))
    console.log(earthquakeMarker)

    //create function to determine marker size by magnitude
    function markerSize(mag) {
        if (mag === 0) {
            return 1;
        } else
        return mag * 3;
        }

    //create function to adjust marker color
    function markerColor(mag) {
        switch (true) {
            case mag > 5:
                return "#581845";
            case mag > 4:
                return "#900C3F";
            case mag > 3:
                return "#C70039";
            case mag > 2:
                return "#FF5733";
            case mag > 1:
                return "#FFC300";
            default:
                return "#DAF7A6";
        } 
    }
}


//perform API call
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
.then(createMarkers)