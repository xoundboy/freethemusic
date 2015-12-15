=====================
X71 (Free The Music)
=====================
This is a **web content management system** for anyone who owns a library or archive of original audio recordings that
they wish to self-publish in a curated way. It's something between Spotify and Soundcloud. I think of it as my personal
Soundcloud with metadata, but it looks more like Spotify.

====
Why?
====
I built it for myself after spending several years working in a recording studio making all sorts of recordings, music,
soundtracks, radio broadcasts and more working with hundreds of diverse people from garage band teenagers in a youth
club to well known recording artists, musicians, comedians, actors and poets. The vast majority of that work never got
widely distributed, nevertheless, most of it was made with that intention and hope springs eternal that more of it may
one day reach a wider audience, even if that is just friends and family.

Hence the name **Free the music** ...

... but it doesn't need to be music really. It could be any MP3 format file. Maybe one day it will also support videos.
The key difference here though, is that each artist, recording, album and playlist will be populate-able with rich
text and imagery, credits, lyrics, artwork and links to other similarly-tagged content within the archive. Your visitors
will of course be able to leave comments and ratings too and sharing on social media will mean a simple button click.

Early versions of my portfolio website (http://xoundboy.com) were very basic. Each recording had its own page, each
artist their own aggregation page but there was no player, no user-generated playlists (play queue) and the user
experience was very basic.

This new design seeks to be delightfully easy to use and so intuitive that even your parents can use it, and maybe drunk
people will use it to D-J their own work at parties. Who knows how it might end up being used? The main thing is that it
should be developed and enriched with nice features that will make it as useful as it can possibly be. That's why I'm
open-sourcing it, hoping to meet like-minded people who can help grow this into something more than I could do on my own.

=================
How Does It Work?
=================
You install this package onto a publicly-accessible web server then add some configuration and set up an administrator
account. You can then log in from your computer via a web browser and begin uploading your MP3s and adding the metadata.
Once your recordings are available in the database, you can start creating and curating your playlists, albums and
compilations and sharing them with your friends.

=======================
What does it look like?
=======================
As soon as there's something to show I'll add some screenshots here. Watch this space.

=================================
What types of metadata can I add?
=================================
We're dealing with four basic types of thing:

- Recordings
- Artists
- Images
- Playlists

Each of these can have a variety of metadata...

Recordings
----------
- Title
- Artist
- Description / notes
- Credits
- Location
- Date
- Artwork (jpg / png format images)
- Tags

Artists
-------
- Name (could be an individual or a group)
- Town
- Country
- Biography
- Images (jpg / png format)
- Artist's website
- Tags

Images
------
- Caption
- Photo credit
- Date
- Description / notes
- Tags

Playlists
---------
- Name
- Atist
- Date
- Artwork (jpg / png format images)
- Description / notes
- Tags

==================
Features Completed
==================
- Upload MP3 flow including addition of recording metadata
- Edit / delete recordings
- Add / edit / delete artists
- Add track to play queue
- Reordering of play queue
- Remove recording from play queue
- Play queue and player - basic functionality (play, pause, skip forward, skip back)
- Play queue persisted in browser local storage


============================
Feature Roadmap in order of priority
============================
(See the issues for this repo for an up to date list of planned features)

- Authentication for administrators
- Securing REST API
- Public facing site hides admin-only features (e.g. edit / delete buttons)
- Playlist management
- Image upload and management
- Tag management
- Search & lazy-loading of recordings
- ...

===================
Engineering Roadmap
===================
- Stable test environment
- build pipeline
- JS unit test coverage
- Functional / flow testing (webdriver)
- Alpha release

===================
System Requirements
===================
Any server capable of running Node.js and MySQL database (Windows, Linux, Mac etc)

- 512MB Ram
- 100MB Disk space for the basic installation (plus extra for storing audio files)

=====================================
Installation - Production Environment
=====================================
**Still in pre-alpha stage of development so not production ready yet. Watch this space.**

==================================
Installation - Testing Environment
==================================

Currently there's only one installer script which is designed to automate the installation on a Debian Linux type server
(see section below). More installer scripts will hopefully appear in the future. There's another script
*(deploy-latest.sh)* that automatically deploys the latest revision to the server once it has already been setup and
configured.

Debian Setup
------------

Using a Bash shell (tested on Ubuntu Server 14.04LTS only):

1. Create a clean installation of a Debian type OS
2. Log in via SSH
3. Get the setup script

::

  $ wget https://bitbucket.org/xoundboy/x7.1/src/c25abe51167b250064856e3bcb107b81650dc940/setup.sh?at=master

4. Make the script executable

::

  $ chmod +x setup.sh

5. Run the script using the source command

::

    $ source setup.sh

6. Follow the instructions. Installation should take around about 10 minutes and you will have to provide input
   at various stages throughout that process.
7. Once the script has completed you can start the node service with:

::

    $ cd ~/x7.1 && npm start

**Important**
Exposing the node service to the public internet is a security risk. If you want the site to be publicly accessible then
use a firewall to block the Node server port and configure Apache or Nginx as a reverse proxy.

** Also Important**
Starting the process using PM2 process manager makes sense so that if the server crashes it automatically restarts
itself and provides logging.

=====
Usage
=====
http://localhost:8080/panel.html

======================================
Installation - Development Environment
======================================
I would warmly welcome anyone who is interested in helping develop this idea and would like to submit pull requests. To
make the idea more attractive to you, I've created a special script that will automatically install your development
environment. Just run the bash script called *deploy_latest_macdev.sh* which you'll find in the scripts folder. Make
sure you read the instructions in comments at the top of the script first.

=======
Contact
=======
Ben Roberts
xoundboy@gmail.com
skype: xoundboy
twitter: xoundboy