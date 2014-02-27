Ayai (HTML5 Frontend)
=====================

To install the mock frontend nginx webserver:

$ sudo su
# apt-get update
# apt-get install python-software-properties
# add-apt-repository ppa:nginx/stable
# apt-get update
# apt-cache show nginx
# ## Find the one with nginx version 1.4.4 and copy and paste it below where $VERSION is 
# ## (for example 1.4.4-1~precise)
# apt-get install nginx=$VERSION
# cd /etc/nginx/sites-enabled
# rm default
# wget https://raw2.github.com/ayaigame/ayai/master/provisioning/roles/common/files/conf/ayai.conf
# service nginx restart
# iptables -t nat -A OUTPUT -d 192.168.100.10 -j DNAT --to-destination 127.0.0.1
# exit

Then just edit ayai.conf and point it to the root of your frontend directory, and sudo nginx restart.

You should then be able to access the debug page at http://192.168.100.10/debug.html.
