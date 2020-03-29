#!/usr/bin/perl

use Image::Magick;

my $pixels = int($ARGV[0]);
my ($longitude, $latitude) = split(/,/, $ARGV[1]);
my $infile = $ARGV[2];
my $outfile = $ARGV[3];
my $magick = Image::Magick->new;
$magick->Read($infile);
my ($width, $height) = ($magick->Get("width"), $magick->Get("height"));

my $x1p = int($width/2) - $pixels;
my $x2p = int($width/2) + $pixels;
my $y1p = int($height/2) - $pixels;
my $y2p = int($height/2) + $pixels;
my $x1g = $longitude - .0005;
my $x2g = $longitude +  .0005;
my $y1g = $latitude + .0005;
my $y2g = $latitude - .0005;

system("gdal_translate -of GTiff -gcp $x1p $y1p $x1g $y1g -gcp $x1p $y2p $x1g $y2g "
    ."-gcp $x2p $y1p $x2g $y1g -gcp $x2p $y2p $x2g $y2g $infile /tmp/tmp.png") == 0
    or die ("img2geotiff.py pixels-per-50m LONG,LAT infile outfile");
system("gdalwarp -r cubic -order 1 -co COMPRESS=LZW /tmp/tmp.png $outfile") == 0
    or die ("img2geotiff.py pixels LONG,LAT infile outfile");
