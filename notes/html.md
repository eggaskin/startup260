# HTML - Hypertext Markup Langauge
[**notes home**](../notes.md)

Made up of tags: `<tag> text </tag>`

## Structure
- `html` tags enclose all code
- `head` with 
  - meta element
  - title element
- body
  - header
    - p paragraph (with span, nav, div subcontent)
  - main
    - sections
      - ul (unordered list)
      - tables
      - aside(s)
  - footer
    - div with span

* block elements take up a block (div, p)
* inline leements are inline (span for styling, b)

### Attributes
Tags can have attributes in them, ex: 
```html
<p id="hello" class="greeting">Hello world</p>
```

* id distinguishes elements
* class is a named group of elements
* href to add links to a (anchor) elements


### Tables
`table` with `tr` for rows, `th` for headers, `td` for data.

### Lists
`ol` or `ul` (ordered or unordered), `li` for list items.

### Comments
`<!-- comment -->`

## Links and Media

`<a href="link"> text </a>` anchor tag

`<img alt="alternate text" src="image source" width=size />` image

`<audio controls autoplay loop src="audio source"> </audio>` audio clip

`<video controls autoplay loop crossorigin="anonymous"> <source src="video source" /> </video>` video clip
> crossorigin is if you request files from a different domain

> source can be a link to a file, or a path to a file
> `width` tag can be used to resize elements

## Creating Media

### SVG
`<svg PARAMS> ELEMENTS </svg>`

* viewBox (4 numbers for sizing)
* xmlns ("http://www.w3.org/2000/svg")
* stroke (color)
* fill (color)
* style (border specs)
* ![More Documentation](https://developer.mozilla.org/en-US/docs/Web/SVG)

*Internal elements:*
* circles with coords, colors, etc
* etc

### CANVAS
`<canvas PARAMS></canvas>
<script> CODE </script>`

* const ctx = INITIALIZE
* from then on, use ctx.FUNCTION to draw.
* beginPath() starts to draw
* arc() circle!
* fillStyle = color
* fill() fills shapes we defined beforehand
* strokeStyle = color
* stroke() draws shapes we defined beforehand
* etc...

## Input
We can make forms!! :tada:
`form` tag with elements:

- date
- text
- password
- email
- tel (phone number)
- url
- number
- checkbox
- radio
- range
- date
- file
- submit (button)
- label (includes for attr corresponding to area id)

Each element can have attributes:
- value (default)
- name (title)
- required
- disabled (interaction?)
- checked

