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
    var rasterTitle =  ['Global',            'Regional',            'Domain',
                        'Local',             'Interior:Sub',        'Interior:Ground',
                        'Interior:1',        'Interior:2',          'Interior:3'];
    var rasterLayer =  ['kethira:global',    'kethira:regional',    'kethira:domain',
                        'kethira:local',     'kethira:interior:sub','kethira:interior:ground',
                        'kethira:interior:1','kethira:interior:2',  'kethira:interior:3'];
    var rasterMaxRes = [2,               .005,                     .001,
                        .00005,          .000001,                  .000001,
                        .000001,         .000001,                  .000001];

    var rasters = [];
    for(i = 0; i < rasterTitle.length; i++) {
        rasters.push(new ol.layer.Tile({
            title: rasterTitle[i],
            maxResolution: rasterMaxRes[i],
            source: new ol.source.TileWMS({
                url: '/geoserver/kethira/wms',
                params: {
                    tiled: true,
                    layers: rasterLayer[i]
                }
            })
        }));
    }

    map = new ol.Map({
        target: 'map',
        layers: [ rasters[0], rasters[1], rasters[2],
                  rasters[3], rasters[4], rasters[5],
                  rasters[6], rasters[7], rasters[8]],
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
