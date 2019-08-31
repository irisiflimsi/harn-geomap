# Harn Webmap Project

## Basic Installation

You need to install _geoserver_ and _qgis_.  Depending on the OS you
use, installation looks differently.  For geoserver, install as
described here: [Geoserver
Installation](https://docs.geoserver.org/stable/en/user/installation/index.html).

Installing _qgis_ is not difficult either. For instance, on _Ubuntu_,
all it takes is `sudo apt-get install qgis`.  Also see the [QGIS
english download
page](https://www.qgis.org/en/site/forusers/download.html).  Make sure
you also have the extension _Raster -> Geo referencing_ available.

---

In the following we use `GEOSERVER_HOME` to denote the place were you
have installed _geoserver_.

## Data Installation

Download the archive from the header.  This includes the important
premade data files you need to get started.  The archive also includes
some javascript libraries for ease of use.  (Have a look at the
acknowledgements.) You can get them directly from these projects, if
you prefer up-to-date versions.

Unpack the archive directly in `GEOSERVER_HOME/data_dir`. This will
create (or update) a directory called
`GEOSERVER_HOME/data_dir/workspaces/images`. Inside you will find a
file CONTENTS.md. The files listed therein you need to create, because
they will contain copyrighted material that cannot be published here.

## Usage

Once you have prepared the necessary files, you need to start
_geoserver_ in case you haven't done so yet. (Starting is part of the
installation instructions, so it is likely that you already did so.)
You may already read on how to change the default admin password.

**Without preparing at least _kethira.tif_, you will only see an empty
  page!**

Direct your browser to
```
http://localhost:8080/geoserver/www/kethira/maps.html
```
and the Kethiran base map will appear.

## Preparation

Each file/image in CONTENTS.md needs to be created by you.  For
general instructions, read on.  Specific instructions for individual
images can be found in subsections.  Each image refers to a published
image, which you need to obtain by extracting it from an electronic
product or scanning a printed copy.  Images will always be assumed to
just create the "raw" data, not legends or additional text.  I.e. the
geographic data spreads from left to right and top to bottom.  If you
create data images, the _png_ format is preferred, because it allows
you to make regions of the otherwise rectangular image that do not
contain data transparent.  Don't save you images in any geoserver
directory yet!

Start qgis and open _Raster -> Geo referencing_.  This will ask you
for a image file.  Use the one you just created.  For each image you
will have a corresponding points file in
`GEOSERVER_HOME/data_dir/kethira/points/`.  Load this (fourth menu
icon from the left).  Most of the time, the non-zero part of the
`srcX` entry you now see at the bottom equals the width your image and
`srcY`to the (negative) height.  Modify this accordingly, if your
image has different dimensions.

Two more things need to be done, before you can create the data image
file by pressing the _Go_ icon (second menu icon from the left).  This
will be a so-called _GeoTIFF_ image.  First, select the _destination
raster_.  This should be the corresponding entry in
`GEOSERVER_HOME/data_dir/images/`, so _geoserver_ can immediately pick
it up. Second, select _EPSG:4326_ as _Destination CRS_. This should
always be the case.

### Global

#### kethira.tif

I extracted a 1418x471 image from _kethira200e.pdf_, page 6.  Cut
off the pole caps. (kelestia.com)

#### venarive.tif

I extracted a 8967x6976 image from _VenariveMap_100.pdf_. (kelestia.com)

### Regional

#### regional/harn.tif

I extracted and scaled an image with dimensions 12000x8000 from
_Harn_Regional_Interactive_Map_201.pdf_. (kelestia.com)

Alternatively I extracted an image with dimensions 16752x11514 from
the Harn map inside the _Atlas-Update-pdfs.zip_. However use
`harn2.points` instead of `harn.points`, it is prepared for that
image; it covers a slightly different area than the other map. (columbiagames.com)

### Domain

#### domain/rethem.tif

This is from the old _Rethem_ module (print only) and I scanned in a
version that resulted in an image of dimension 6375x4730. It reaches
(NW) from the middle of the northern boundary of the hex _Bedenes_ is
in to the SE corner of the hex _Heroth_ is in. (columbiagames.com)

#### domain/afarezirs.tif

A set of fan provided pdfs, I combined and created a map from. It is
of dimension 9455x7399 and extends from the lower hex boundary that
contains the word (K)ADAG (south) to upper boundary of the two hexes
that contain the two northern most islands (north) and from left-most
vertex of the hex containing the west-most island (west) to the center
of all eastern edges containing the tow eastern most islands. (John Southgate)

## Acknowledgements

The harn-webmap project makes use of the following software packages.
Without them, this project would not have been possible.

* [QGis](https://www.qgis.org)
* [Geoserver](http://geoserver.org)
* [OpenLayers](https://openlayers.org)
* [JQuery](https://jquery.com)
