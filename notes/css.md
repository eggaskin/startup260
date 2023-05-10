# CSS - Cascading Style Sheets
[**notes home**](../notes.md)

Can set properties for different elements in the HTML. Ex.

'''css
(element, * for all) {
    property: property;
}
'''

element titles can be more complex:
* body section (section elements found in body elements)
* section > p (p elements that are a direct child of section elements)
* P ~ div (p elements that have a div element sibling)
* p + div (p elements that have an adjacent div element sibling)

## Selectors

*Class* (class="name")
'.class' denotes elements in a certain class.

*ID* (id="name")
'#id' denotes elements with a certain id.

To select elements with a specific *attribute*:
'element[attribute="attr val"]'

"Pseudo" selector look like 'section:hover' and happen when a specific action happens.

## Declarations
Change the properties of an element. So many. Use [this reference](https://learn.cs260.click/page/css/declarations/declarations_md).

**Units**: can specify a suffix to use different units.

### Fonts
Font families are groups of fonts: serif, sans-serif, fixed, symbol (non-text).

To get other fonts, import from a site or from [google](https://fonts.google.com/):
'''css
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

OR

@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.woff2');
}
'''

## Animation
First declare the properties 'animation-name' and 'animation-dur'.
Then make your keyframes:

'''css
@keyframes demo {
  from {
    font-size: 0vh;
  }

  10% { <!-- this happens 10% of the way through animation -->
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
'''

## Display settings
'display' attribute:
* none (invisible)
* block (fills parent)
* inline (as big as content)
* flex (children are flexible)
* grid (children are in grid)

'float' attribute:
Can position so other elements \'wrap\' around the element. none/right/left

'@media' selector: can change how content is displayed based on orientation.
So '@media (orientation: portrait) {}' changes how divs are displayed, or similar.

### Grid
Use to display group of child elements! Ex. div with many div's inside.

Grid attributes:
* template columns
* auto rows
* gap

### Flex
Areas can move around as screen is resized.

'flex-direction' is how they are displayed. Then format child elements with different directions as needed.

'flex' set with how much content can grow (0-#, 0 means is static) or a pixel/etc size.

Properties can be overridden in lower levels, lowest level being the HTML itself.

* content: text and images
* padding: background
* border: style, text color/thickness, etc
* margin: whitespace


