#!/usr/bin/env bash

echo "Install nginx"
sudo apt-get update
sudo apt-get install -y nginx
sudo cp /vagrant/nginx.conf /etc/nginx/sites-available/test
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/test /etc/nginx/sites-enabled/test
sudo service nginx restart

echo 'cd /vagrant' >> ~/.bashrc
