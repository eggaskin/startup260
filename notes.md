# NOTES

- [Web Servers](./notes/web.md)
- [HTML](./notes/html.md)
- [CSS](./notes/css.md)
- [JavaScript](./notes/js.md)


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

### other console commands
- ctrl-z sends to background
- ctrl-r recall search
- cd -la (long files, shows hidden files)

### deployment
* push/pull from dev environ (console, vscode here) to git (https://local)
* deploy to production environ (https://domain)

'./deployService.sh -k ~/(KEY) -h (ROOT DOMAIN) -s (simon/startup)'

* checks for the correct parameters
* deletes what is in remote server
* creates copies of curr program to remote server

### Subdomains
To add another:
* add to caddy file
* add to Route 53
* deploy
* anything else???
