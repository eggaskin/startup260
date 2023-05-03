# NOTES

- [Web Servers](./notes/web)
- 


## KEY INFO
http://34.196.7.147/ (elastic)

> ssh -i (path to key) ubuntu@(ip address)

80 is http, 433 is https, 22 is ssh (?)

### vim commands
- k up, j down
- i insert
- esc exit
- :q! unconditional quit
- :wq write and quit

### deployment
* push/pull from dev environ to git (https://local)
* deploy to production environ (https://domain)

EX: 
'''./deployService.sh -k ~/(KEY) -h (ROOT DOMAIN) -s (simon/startup)'''
