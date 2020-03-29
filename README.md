# Harn Webmap Project

## Table of Contents

1. [Basic Installation](#basic-installation)
2. [Data Installation](#data-installation)
3. [Usage](#usage)
4. [Preparation](#preparation)
5. [Community Maps](#community-maps)
6. [Do-it-yourself](#do-it-yourself)
7. [Acknowledgements](#acknowledgements)

## Basic Installation

You need to install _geoserver_ and _qgis_.  Depending on the OS you
use, installation looks differently.  For geoserver, install as
described here: [Geoserver
Installation](https://docs.geoserver.org/stable/en/user/installation/index.html).

Installing _qgis_ is not difficult either.  For instance, on _Ubuntu_,
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

Unpack the archive directly in `GEOSERVER_HOME/data_dir` such that
_workspaces_ from the archive maps to _workspaces_ in _data_dir_ and
_www_ from the archive to _www_ in _data_dir_.  In other words, such
that the enclosing cryptic directory is not used.  This will create
(or update) a directory called
`GEOSERVER_HOME/data_dir/workspaces/images`.  Inside you will find a
file CONTENTS.md.  The files listed therein you need to create,
because they will contain copyrighted material that cannot be
published here.

## Usage

Once you have prepared the necessary files, you need to start
_geoserver_ in case you haven't done so yet.  (Starting is part of the
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

With each point file you can create a GeoTIFF file (see below).  Each
image refers to a published image, which you need to obtain by
extracting it from an electronic product or scanning a printed copy.
Images will always be assumed to just create the "raw" data, not
legends or additional text.  I.e. the geographic data spreads from
left to right and top to bottom.  If you create data images, the _png_
format is preferred, because it allows you to make transparent regions
of the otherwise rectangular image that do not contain data.  Don't
save you images in any geoserver directory yet!

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
it up.  Second, select _EPSG:4326_ as _Destination CRS_.  This should
always be the case.

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
additional, seperate requests obsolete.  For community images this is
generally not a problem.  In fact, my own I have already included.
For the commercial images, I expect the process to be different.
Maybe they will provide their own installation in the future.

The generic community maps I converted are all arbitrarily placed,
where it suited my campaign.  The naming is such that the _first
number_ is the edition (e.g. _pottage3_) and the _second number_ the
page.  They serve as backdrops for the interior maps, so even if you
place them elsewhare the relationship between local and interior map
is conserved.  See also _Community Maps_.

## Community Maps

These maps are mostly obtained from _lythia.com_.  I hope to host the
converted maps in the future.  Until then you can get them from me
privately through email, if you prove you are aware of who alleges
Copyright.

## Do-it-yourself

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
of advice: QGIS doesn't really show enough significant digits) maybe
there is a setting I didn't find) so I did mine with an ASCII text
editor and imported the point file.

### Helper script

If have a bit of experience with scripts (perl, bash, python, ...),
the included _img2geotif.pl_ may be of help.  It reduces the effort
you need to spend to find pixel differences and also does not require
QGIS as it creates GeoTIFF files directly.  It is the reason why I
don't provide any further point files at this time.  You will need to
install a the perl module _Image::Magick_.

## Acknowledgements

The harn-webmap project makes use of the following software packages.
Without them, this project would not have been possible.

* [QGis](https://www.qgis.org)
* [Geoserver](http://geoserver.org)
* [OpenLayers](https://openlayers.org)
* [JQuery](https://jquery.com)
