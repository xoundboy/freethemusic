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
