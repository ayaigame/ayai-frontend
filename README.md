Ayai (HTML5 Frontend)
=====================

To install the mock frontend nginx webserver:

 sudo su <br/>
 apt-get update <br/>
 apt-get install python-software-properties <br/>
 add-apt-repository ppa:nginx/stable <br/>
 apt-get update <br/>
 apt-cache show nginx <br/>
 
  //Find the one with nginx version 1.4.4 and copy and paste it below where $VERSION is  <br/>
  //(for example 1.4.4-1~precise)
  
 apt-get install nginx=$VERSION <br/>
 cd /etc/nginx/sites-enabled <br/>
 rm default <br/>
 wget https://raw2.github.com/ayaigame/ayai/master/provisioning/roles/common/files/conf/ayai.conf <br/>
 service nginx restart <br/>
 iptables -t nat -A OUTPUT -d 192.168.100.10 -j DNAT --to-destination 127.0.0.1 <br/>
 exit

Then just edit ayai.conf and point it to the root of your frontend directory, and sudo nginx restart.

You should then be able to access the debug page at http://192.168.100.10/debug.html.
