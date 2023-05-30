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
* method:
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

