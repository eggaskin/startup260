# WEB SERVERS
[**notes home**](../notes.md)

:computer:

* DNS is Domain Name System, tables used to convert domain name (byu.edu) to IP address (128.187)
* TCP transport layer, move connection packets
* Fiber and hardware \- physical linking
* HTTP (hypertext transport protocol) is what we interact with

Tim Berners-Lee -> the Web Father, HTML, structure
Hakon Wiume Lie -> CSS, styling
Brandon Eich -> JavaScript, interaction


> ## DNS
> news.byu.edu
> - root domain is byu.edu
> - subdomain is news.
> - top level domain is edu.
> Each subdomain can be at a different IP.
> 'whois' to get info for a root domain.
>  
> To map domain to IP, use:
> * A (address): maps domain -> IP
> * CNAME (canonical name): maps domain -> domain. aliasing!
> 
> Finding IP addresses: browser cache -> DNS server cache -> authoritative name server -> error.
> 
> > so much caching?? TTL (time to live) clears cache after time period, so you can update domain info successfully.
>  

'curl' makes http requests.

Different services use different ports, and a *gateway* helps split traffic from different services to different ports.

![Gateway Port Diagram](https://github.com/webprogramming260/.github/blob/6773fc923e8e12ddb159b85053a0f508b12e1f15/profile/webServers/webServers/webServersGateway.jpg)

**microservices** can serve multiple users concurrently.

**serverless** functions speak http and just need to be loaded, automatically scaled by the gateway.


## Caddy
Gateway/reverse proxy service.

- listens for https requests
  - serves up files
  - routes request to another service
- creates/rotates web certs
- serves up all static files
- gateway to subdomains

'~/Caddyfile' config
* defines where http requests are routed
* has location of static HTML files
* proxy requests to services

'~/public_html' HTML files

'/usr/share/caddy' static file server

'''
:80 {
      root * /usr/share/caddy
      file_server
}
'''

http request on port 80 -> use path to find corress file.

*EX: http://yourdomainname/index.html looks for index.html in public_html directory*

## HTTPS

* TLS handshake negotiates 'secret' to encrypt data
* Web *certificates*: verifies domain's identity

![certificationn process](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/letsencryptCertIssue.jpg)


