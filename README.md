# Harn Worldmap Project

## Basics

Using many geo-coordinate features - as you see for instance in Google
Maps Sattelite Imagery - for Hârn is actually quite simple.  All the
relevant information can be stored in a format called GeoTIFF.  You
load a bundle of them into the relevant program (see below) and you
are set.  Further features, such as showing the maps in a browser, may
require more effort.

The archive you can download from this page contains a couple of
GeoTIFF files, which I can freely distribute.  You will also see a
_CONTENTS.md_ file in the archive, which shows you how many more are
available.  I cannot publish them without the proper license.  Many of
them are based on _lythia.com_ images and since they can freely be
downloaded, you can send me a private message and I will forward the
GeoTIFF files you need.  That assumes that you actually could create
the files yourself: you have the base material and in the following I
will provide you with the procedure.  This procedure you can apply to
any other image you want to, including official maps you bought from
Columbia Games or Kelestia.com.

I have added the database for the points of interest I have
geo-located in this manner.  You can find them in the
_workspaces/kethira_ subdirectory.  You can import them into _qgis_ or
_geoserver_ in vector data.  There has been some discussion in the
Harnforum about projection and it is far from obvious which one is
canonical.  I therefore added a basic Hârn image with geo coordinates
for your convenience to more easily understand where everything is
located in "my" projection.  Again, import as raster data into the
tool of your choice.

## QGis

Installing _qgis_ is not difficult.  For instance, on _Ubuntu_, all it
takes is `sudo apt-get install qgis`.  Also see the [QGIS english
download page](https://www.qgis.org/en/site/forusers/download.html).
If all you want to do is get started, load the images into _qgis_.
You are set.

**Without preparing at least _kethira.tif_, you will most likely only
see an empty page!**

In the following we use `GEOSERVER_HOME` to denote the place were you
have installed _geoserver_.  If you only use _qgis_, ignore the
paragraphs for _geoserver_; this will be the directory you unpack the
archive to.

Unpack the archive directly in `GEOSERVER_HOME/data_dir` such that
_workspaces_ from the archive maps to _workspaces_ in _data_dir_ and
_www_ from the archive to _www_ in _data_dir_.  In other words, such
that the enclosing cryptic directory is not used.  This will create
(or update) a directory called
`GEOSERVER_HOME/data_dir/workspaces/images`.

## Do-It-Yourself

To create your own GeoTIFFs, you need make sure you also have the
extension _Raster -> Geo referencing_ available.  For the base images
use the format _png_ with an alpha channel.

Start _qgis_ and open _Raster -> Geo referencing_.  This will ask you
for an image file.  Use the one you just created.  For each image you
will have either a corresponding points file in
`GEOSERVER_HOME/data_dir/kethira/points/`, you have created your own.
Load that.  Alteratively, you can pick anchor points from another map
you already loaded, but for that you must, well, load a pre-existing
map.  (They point files provided were all used by myself when creating
the GeoTIFFs from _CONTENTS.md_.) 

Two more things need to be done, before you can create the data image
file by pressing the Go icon (second menu icon from the left), which
will be a so-called GeoTIFF.  First, select the destination raster.
This should be the corresponding entry in
`GEOSERVER_HOME/data_dir/workspaces/images/`, so _geoserver_ can immediately pick
it up.  Second, select _EPSG:4326_ as Destination CRS.  This should
always be the case and should even be the default in _qgis_.

For some of the main files, more detailed explanations are given
below.

## Geoserver

As said before, I suggest to install _geoserver_.  That makes the
"daily work" much easier, as you can view the maps through the browser
of your choice.  Depending on the OS you use, installation looks
differently.  Install as described here: [Geoserver
Installation](https://docs.geoserver.org/stable/en/user/installation/index.html)

Once you have prepared the necessary files, you need to start
geoserver in case you haven’t done so yet.  (Starting is part of the
installation instructions, so it is likely that you already did so.)

You then should create data stores according to the sub-directories
(in images) as Image Mosaic and publish them as layers of the same
names.  Direct your browser to
```
http://localhost:8080/geoserver/www/kethira/maps.html
```
and the Kethiran base map will appear.

## Details on Specific Images

### Global

#### kethira.tif

I extracted a 1418x471 image from _kethira200e.pdf_, page 6.  Cut off
the pole caps.  (kelestia.com)

#### venarive.tif

I extracted a 8967x6976 image from _VenariveMap_100.pdf_.
(kelestia.com)

### Regional

#### regional/harn.tif

I extracted and scaled an image with dimensions 12000x8000 from
_Harn_Regional_Interactive_Map_201.pdf_.  (kelestia.com)

Alternatively I extracted an image with dimensions 16752x11514 from
the Harn map inside the _Atlas-Update-pdfs.zip_.  However use
`harn2.points` instead of `harn.points`, it is prepared for that
image; it covers a slightly different area than the other map.
(columbiagames.com)

### Other Images

For any other image, the extracting process is similar.  If you
provide me with proof that you "own" a version of the commercial
images, I will send the converted GeoTIFF to you (until I get too many
requests).  For community images I will send them on request (assuming
I have them).  If I get many requests, I will ask you to contact the
copyright owners such that I can include the images here and make
additional, separate requests obsolete.  For community images this is
generally not a problem.  In fact, my own I have already included.
For the commercial images, I expect the process to be different.
Maybe they will provide their own installation in the future.

The generic community maps I converted are all arbitrarily placed,
where it suited my campaign.  The naming is such that the _first
number_ is the edition (e.g. _pottage3_) and the _second number_ the
page.  They serve as backdrops for the interior maps, so even if you
place them elsewhare the relationship between local and interior map
is conserved.  See also _Community Maps_.

#### Community Maps

These maps are mostly obtained from _lythia.com_.  I hope to host the
converted maps in the future.  Until then you can get them from me
privately through email, if you prove you are aware of who alleges
Copyright.

#### Private Maps

Basically this works as the general import for pre-existing maps.  You
have to create the point files yourself.  To get the scale right, make
sure your map is of a standard resolution (local, interior, ...).  You
can then reuse any of the existing _points_ files, where you keep the
relation between

```
horizontal pixel difference : longitude difference
```

and

```
vertical pixel difference : latitude difference
```

and then shift the whole set according to where you want it.  A point
of advice: _qgis_ doesn't really show enough significant digits) maybe
there is a setting I didn't find) so I did mine with an ASCII text
editor and imported the point file.

### Helper script

If have a bit of experience with scripts (perl, bash, python, ...),
the included _img2geotif.pl_ may be of help.  It reduces the effort
you need to spend to find pixel differences and also does not require
QGIS as it creates GeoTIFF files directly.  It is the reason why I
don't provide point files for all images listed in _CONTENT.md_.
You will need to install a the perl module _Image::Magick_.

## Acknowledgements

The harn-webmap project makes use of the following software packages.
Without them, this project would not have been possible.

* [QGis](https://www.qgis.org)
* [Geoserver](http://geoserver.org)
* [OpenLayers](https://openlayers.org)
* [JQuery](https://jquery.com)
