# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.provider "virtualbox" do |v|
    v.memory = 512
    v.cpus = 1
  end
  config.vm.box = "ubuntu/trusty32"

  config.vm.network "forwarded_port", guest: 80, host: 80 # nginx

  config.vm.provision :shell, :path => "bootstrap.sh"
  config.vm.synced_folder ".", "/vagrant", :mount_options => ["dmode=777", "fmode=666"]
  config.vm.network "private_network", ip: "33.33.33.20"
end
