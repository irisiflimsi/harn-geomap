var map;

function fly(lon,lat,zom) {
    var location = [lon, lat];
    var pan = ol.animation.pan({
        source: map.getView().getCenter()
    });
    var zoom = ol.animation.zoom({
        resolution: map.getView().getResolution(),
    });
    map.beforeRender(pan);
    map.beforeRender(zoom);
    map.getView().setCenter(location);
    if (zom != 0) {
        map.getView().setResolution(zom);
    }
}

function getFeatures(name, vector) {
    $.ajax('/geoserver/wms', {
        type: 'GET',
        data: {
            service: 'WFS',
            request: 'GetFeature',
            typename: name[i] + '-vector',
            outputFormat: 'application/json'
        }
    }).done(
        response => vector.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(response))
    );
}

function postLoad() {
    var resolutions = Array.from(Array(26), (item, index) => 2.8125/Math.pow(2, index));
    var matrixIds = Array.from(Array(26), (item, index) => 'EPSG:4326:' + index);

    var title =  ['Global', 'Regional', 'Domain', 'Local', 'Interior:Sub', 'Interior:Ground',
                  'Interior:1', 'Interior:2', 'Interior:3', 'Interior:4', 'Interior:5'];
    var name =  ['postgis:global', 'postgis:regional', 'postgis:domain', 'postgis:local',
                 'postgis:interior-sub', 'postgis:interior-G', 'postgis:interior-1',
                 'postgis:interior-2', 'postgis:interior-3', 'postgis:interior-4', 'postgis:interior-4'];
    var maxResolution = [resolutions[0], resolutions[7], resolutions[10], resolutions[14],
                         resolutions[20], resolutions[20], resolutions[20], resolutions[20],
                         resolutions[20], resolutions[20], resolutions[20]];
    var maxVResolution = [resolutions[3], resolutions[8], resolutions[11], resolutions[16],
                          resolutions[21], resolutions[24]];

    var rasters = [];
    var vectors = [];
    for(i = 0; i < title.length; i++) {
        var proj = name[i].substring(0,7);
        rasters.push(new ol.layer.Tile({
            title: title[i],
            maxResolution: maxResolution[i],
            source: new ol.source.TileWMS({
                url: '/geoserver/'+proj+'/wms',
                params: { tiled: true, layers: name[i] }
            })
        }));
        if (i != 4 && i < 7 ) {
            var vector = new ol.layer.Vector({
                title: title[i] + "-vector",
                minResolution: maxVResolution[Math.min(i,4)+1],
                maxResolution: maxVResolution[Math.min(i,4)],
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        src: 'poi-' + Math.min(i,4) + '.svg',
                        scale: .2
                    })
                }),
                source: new ol.source.Vector({ projection: 'EPSG:4326' })
            });
            vectors.push(vector);
            getFeatures(name, vector);
        }
    }

    var overlay = new ol.Overlay({
        element: document.getElementById('popup')
    });
    var vlayers = [ vectors[0], vectors[1], vectors[2], vectors[3], vectors[4] ];
    map = new ol.Map({
        target: 'map',
        layers: [ rasters[0], rasters[1], rasters[2],
                  rasters[3], rasters[4], rasters[5],
                  rasters[6], rasters[7], rasters[8],
                  rasters[9], rasters[10],
                  new ol.layer.Group({ combine: true, title: 'Data', layers: vlayers }),
                  new ol.layer.Group({ combine: true, title: 'Data:1', layers: [ vectors[5] ]}) ],
        overlays: [overlay],
        controls: ol.control.defaults().extend([
            new ol.control.FullScreen(),
            new ol.control.LayerSwitcher(),
            new ol.control.ScaleLine()
        ]),
        view: new ol.View({ projection: 'EPSG:4326' })
    });
    
    var clicked;
    map.on('click', function(e) {
        var pixel = e.coordinate;
        var feature = map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
            return feature;
        });
        if (feature) {
            if (clicked == feature) {
                overlay.setPosition(undefined);
                clicked = null;
            }
            else {
                overlay.setPosition(feature.getGeometry().getCoordinates());
                $("#desc").load(feature.get('text') + ".html");
                clicked = feature;
            }
        }
    });

    document.getElementById('popup-closer').onclick = function() {
        overlay.setPosition(undefined);
        clicked = null;
        return false;
    };

    map.getView().fit([-180,-60, 180, 60], map.getSize());

//    demo();
}

/*
async function demo() {
    console.log("Demo...");
    console.log("First stop...");
    var here = [0,0];
    var there = [-24.47097,44.01842];
    for(i = 0; i < 21; i++) {
        var zoom = ol.animation.zoom({
            resolution: map.getView().getResolution()
        });
        var pan = ol.animation.pan({
            source: map.getView().getCenter()
        });
        map.beforeRender(pan,zoom);
        map.getView().setZoom(i+3);
        map.getView().setCenter([there[0] + Math.pow(2, -i - 1)*(here[0] - there[0]),
                                 there[1] + Math.pow(2, -i - 1)*(here[1] - there[1])]);
        await sleep(2500);
    }
    here = [-24.47097,44.01842];
    there = [-25.17856,43.80321];
    for(i = 0; i < 12; i++) {
        var zoom = ol.animation.zoom({
            resolution: map.getView().getResolution()
        });
        map.beforeRender(zoom);
        map.getView().setZoom(23 - i);
        await sleep(2000);
    }
    for(i = 0; i < 11; i++) {
        var pan = ol.animation.pan({
            source: map.getView().getCenter()
        });
        map.beforeRender(pan);
        map.getView().setCenter([here[0] + i*(there[0] - here[0])/10,
                                 here[1] + i*(there[1] - here[1])/10]);
        await sleep(1000);
    }
    for(i = 0; i < 12; i++) {
        var zoom = ol.animation.zoom({
            resolution: map.getView().getResolution()
        });
        map.beforeRender(zoom);
        map.getView().setZoom(12 + i);
        await sleep(2500);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
*/
