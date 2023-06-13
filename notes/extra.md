# Extra Notes - SECURITY!!


## OWASP 10 - most common security issues
* Broken Access Control
  * url bypassing
  * resource ID provide access
  * authentication bypass

* Cryptographic Failure
  * clear text, no encryption
  * weak encryption

* Injection
  * user supplied data is not sanitized
  * SQL injection - messes with databases
  * code to watch keyboard, alert, take cookies, etc. bad

* Insecure Design
  * unlimited trials
  * not best practices - encrypting
  * single layer defense

* Security Misconfiguration
  * default passwords
  * default settings
  * not removing unused features
  * dev info, packages and services used

* Vulnerable Components
  * unnecessary/unused imports
  * out of date
  * untrusted sources
  * unlocked package versions
  * vulnerability bulletins!!

* ID and Auth
  * brute force
  * weak passwords
  * weak credential recovery
  * unexpiring auth tokens
    * throttle requests so it takes longer as you take more attempts

* Software Integrity
  * unverified CDN, packages, updates, platforms

* Logging Failure
  * critical requests
  * not monitoring performance
  * logs auditing/storage
  * real-time response

* Server Side Request Forgery
  * front end is public!
  * fake requests to internal servers


