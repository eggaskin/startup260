# UX, HTTP
[**notes home**](../notes.md)

## Web Services
* fetch(url) returns a promise
![ports](https://raw.githubusercontent.com/webprogramming260/.github/main/profile/webServices/ports/webServicesPorts.jpg)
* 80 is http, 443 is https, 22 is ssh

### URL
*  https:// - scheme
*  cs260.click - domain
*  :443 - port
*  /api/city - path
*  ?q=pro - parameter
*  #3 - anchor

### HTTP requests
* method: (verbs)
  * GET existing resource
  * POST new resource
  * PUT update resource
  * DELETE resource
  * OPTIONS get info about resource
  * path
  * version
* headers
  * host domain
  * user agent with path and version
  * content length, how much data
  * accept types (\*/\* is anything)
  * accept-encoding (gzip, deflate, br)
  * etc.
* body 

### HTTP responses
* version with status code and status message
  * 200 OK, 204 no content
  * 301/2 redirect, 304 not modified
  * 400 bad request, 404 not found, 403 forbidden, 429 too many requests
  * 500 server error, 503 not available
  * i am a teapot (418) is a joke status code for when a server cannot brew coffee because it is a teapot (RFC 2324) 
* content type: types to return
* content length
* connection:
  * keep-alive
  * close
* content encoding (gzip, deflate, br)
* body

* can get a set-cookie response header to set a cookie
  * expires, secure, HttpOnly (no javascript), SameSite=Strict
* cache control (browser has a cache, cache servers, origin server)
    * max-age=0, no-cache, no-store, must-revalidate, public, private, proxy-revalidate

* _security_.. avoid forging website data!
  * attacker website with mispelled domain
  * mimics source website
  * fetch to actual website so they do login, but steals credentials
  * AVOID by using same origin policy (*SOP*) - can't fetch to different domain
  * *CORS* - cross origin resource sharing
    * server can allow other domains to fetch from it
    * server sends Access-Control-Allow-Origin header (with allowed origin domains)
    * browser checks if domain is allowed to fetch
    * if allowed, browser sends request
    * if not, browser throws error

## steps to service
node.js -> express -> middleware

>
> *nvm* - node version manager, Node - js runtime, *npm* - node package manager
> long term support node preferred
> *npm* install ___ to install packages
> in js file, 'const package = require(package-name)' then 'package.function()' to use package
>
> 'http' package is built in, but use 'express' instead
> > 'http' use: createServer with callback function (req, res) that runs on response, listen to port
> > 'express' use: 'app = express()', express, app, req, res, router
> > > 'app.use(path(maybe),callback)' to use middleware (in order)
> > > 'app.get(path, callback)' to use callback function on path
> > > 'app.listen(port)' to listen to port
> > Routers: 'router = express.Router()', 'router.get(path, callback)', 'app.use(path, router)'
> > you could have multiple routers for different paths, a secure vs. not, etc.
> > 'app.use(express.static(path))' to serve static files
> > 'err' parameter for callback functions to handle errors
> > res.send() to send response, sendFile, redirect, status
>  PM2 (process manager) - daemons
>  * 'pm2 start index.js -n name -- port' to start app, 'pm2 save'
>  

use 'npm init -y' to create json files for service, then 'npm install express' to install express. make sure to add node_modules folder to .gitignore for clean repo.

* express is a framework for node.js
* middleware is a function that takes a request and response and does something with it
 * takes (req, res, next) as parameters
  * next() calls the next middleware
  * res.send() sends a response
* test using fn-5 to debug, and connec to localhost:port to test in browser.
* restart server when changes are made, or use nodemon to auto-restart.
* look at network tab in dev tools to see requests and responses

### endpoints
functions for your service, api (application program interface)
* readable!! ex. 'store/provo/order/2
* simple
* documented

### formats/endpoint models
remote procedure call - RPC
* function called/ran on another computer
* POST request with function name and parameters
* response with result

REST - representational state transfer
* use all HTTP methods/verbs as much as possible
* url is a noun, ex. '/order/2'

GraphQL
* query for everything you want


## UX
sitemap - how user expects to navigate site, not what is easiest to code!!

* display location (what page you're on)
* browser controls
* breadcrumbs 
* common paths (ex. song to song artist)

> paletton.com, color.adobe.com for color selection

* serif fonts have feet on ends of strokes
* sans-serif fonts do not
* monospace fonts have equal spacing between letters
* cursive fonts are handwritten
* *the less fonts, the better*

>  google fonts api for fonts!!

* page title > titles > text > secondary text > input
* line cutoff is ideal around 60 characters
* standard icons!!

* Hick's Law: time to make a decision is proportional to the number of choices - increases logarithmically

### Accesibility
* colorblindness
* contrast
* sizing of text
* screen reader support
* closed captions
* visual animations
* keyboard navigation
* element ordering

*GDPR* - General Data Protection Regulation
*FERPA* - Family Educational Rights and Privacy Act
*HIPAA* - Health Insurance Portability and Accountability Act
*PCI* - Payment Card Industry Data Security Standard

Walls: registration, payment, login, navigation, legal, cookies

Internationalization: language, currency, times, dates, units, addresses, phone numbers

