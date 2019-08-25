var map;

function fly(lon,lat,zom) {
    var location = [lon, lat];
    var pan = ol.animation.pan({
        source: map.getView().getCenter()
    });
    var zoom = ol.animation.zoom({
        resolution: map.getView().getResolution()
    });
    map.beforeRender(pan);
    map.beforeRender(zoom);
    map.getView().setCenter(location);
    map.getView().setResolution(zom);
 }

function postLoad() {
    var rasterTitle =  ['Global'         ];
    var rasterLayer =  ['kelestia:global'];

    var rasters = [];
    for(i = 0; i < rasterTitle.length; i++) {
        rasters.push(new ol.layer.Tile({
            title: rasterTitle[i],
            source: new ol.source.TileWMS({
                url: '/geoserver/kelestia/wms',
                params: {
                    tiled: true,
                    layers: 'kelestia:kethira',
                }
            })
        }));
    }

    map = new ol.Map({
        target: 'map',
        layers: [ rasters[0] ],
        controls: ol.control.defaults().extend([
            new ol.control.FullScreen(),
            new ol.control.LayerSwitcher(),
            new ol.control.ScaleLine()
        ]),
        view: new ol.View({
            projection: 'EPSG:4326'
        })
    });
    map.getView().fit([-180,-60, 180, 60], map.getSize());
}
