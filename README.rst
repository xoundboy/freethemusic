========
Overview
========

X7.1 (Free The Music)

This is a web content management system for anyone who has a library or archive of original audio recordings that they
wish to publish in a curated way. It's something between Spotify and Soundcloud. I think of it as my personal soundcloud
with metadata.

I built it for myself after spending several years working in a recording studio making all sorts of recordings, music,
soundtracks, radio broadcasts and more working with hundreds of diverse people from garage band teenagers in a youth
club to well known artists, musicians, comedians, actors and poets. The vast majority of that work never got widely
distributed, nevertheless, most of it was made with that intention and hope springs eternal that more of it may one day
reach a wider audience, even if that is just friends and family.

Hence the name "Free the music"...

... but it doesn't need to be music really. It could be any MP3 format file. Maybe one day it will also support videos.
The key difference here though, is that each artist, recording, album and playlist will be populate-able with rich
text and imagery, credits, artwork and links to other similarly-tagged content within the archive as well as support
user interaction and commentary.

Early versions of my portfolio website (http://xoundboy.com) were very basic. Each recording had its own page, each
artist their own aggregation page but there was no player, no user-generated playlists and the user experience was bad.

This new design seeks to be delightfully easy to use and so intuitive that your parents can use it, and maybe even drunk
people will use it to D-J their own work at parties. Who knows how it might end up being used. The main thing is that it
should be developed and enriched with nice features that will make it as useful as it can possibly be. That's why I'm
open sourcing it, hoping to meet like-minded people who can help grow this into something more than I could do on my own.





Setup for Ubuntu 14.04 LTS - clean install
==========================================

Using a Bash shell (tested on Ubuntu Server 14.04LTS only):

1. create a clean installation of Ubuntu Server 14.04 LTS

2. log in via SSH

3. Get the setup script
    $ wget https://bitbucket.org/xoundboy/x7.1/src/c25abe51167b250064856e3bcb107b81650dc940/setup.sh?at=master

4. Make the script executable
    $ chmod +x setup.sh

5. Run the script using the source command
    $ source setup.sh

6. Follow the instructions. Installation should take around about 10 minutes and you will have to provide input
   at various stages throughout that process.

7. Once the script has completed you can start the node service with:
    $ cd ~/x7.1 && npm start



Use
===
http://localhost:8080/panel.html

Note that you should install a reverse proxy (e.g. Nginx) to expose the service to the public internet
