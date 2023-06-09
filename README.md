# startup260
## Description deliverable

### Elevator pitch

Have you ever suddenly realized that you needed some ingredient for a meal, some replacement part, some event to look into, then gone to write it down but either forgot it before finding where to write it, or couldn't find where you wrote it down later? Use Noted to note down everything you might forget, and add it immediately to categories of your own making - grocery lists, spare parts, or people to respond to - so your lists don't get lost.

### Design

![Mock](mockup.jpg)

### Key features

- Secure login over HTTPS
- Ability to select category/categories to add note to
- Display of category choices
- Ability to add category
- Ability to customize added categories
- Ability to view category and all notes added to category
- Ability to delete categories
- Ability to delete items from categories
- Ability to add notes to global category for all users, whose notes clear after a certain point

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - HTML pages for category viewing, note adding, and login/about page.
- **CSS** - Style options to make them look nice. Make categories look cool.
- **JavaScript** - Login, possibly animate note making.
- **Service** - Backend service with endpoints for:
  - login
  - submit notes
  - view categories
- **DB** - Store categories and notes in categories in database. Ability to recall these.
- **Login** - Register and login users.
- **WebSocket** - As a user adds a note to the global category, it's sent to the web server. Any user can view the global category as well as all the notes in it in real time.
- **React** - Application ported to use the React web framework.

## HTML deliverable

For this deliverable I added the application structure.

- **HTML pages** - There are separate pages
- **Links** - There is a navigation menu with links between the pages.
- **Text** - There are text decriptions on the About page and descriptions for different elements.
- **Images** - There is a placeholder logo image on each page in the header.
- **Login** - There is a login page with a place for username/password, and a username display on every page.
- **Database** - There is a mock category viewing page with different notes from a category, and ability to delete and add notes to categories.
- **WebSocket** - There is a mock category viewing page with fake global category notes and usernames, and on the notepad page there is a category option for the global category.

## CSS deliverable

- **Header, footer, and main content body** - I color coded the header and made it horizontal when there's room, to be changed to a vertical menu if the window is too narrow. The footer is also color coded and is at the base of the page. Both the navigation menu and the footer are similar in design, just different colors. The main content is also color coded and separated into flexboxes that partition the different aspects of my website so it's not all in one column like it was with the HTML.
- **Navigation elements** - I made the navigation links in the header's menu buttons, with the page you are on capitalized and a darker color. They still act as links.
- **Responsive to window resizing** - The content resizes, and the header menu switches orientations when the window is too narrow.
- **Application elements** - I color code the different "sections" of my website, including "post its" for category selection, styling, and login, and grids for things like note lists and global note boards. I animated the category list items when hovered over.
- **Application text content** - My textual content varies in sizing, color, and thickness.
- **Application images** - I have an image "logo" in the header navigation bar that resizes with the window. I also have delete icon images for the item deletion in the categories page.


## JavaScript deliverable

- **login** - The user can enter a username on the login page which is then displayed on every page on the top navigation bar. It is saved in localStorage so it persists between sessions.
- **database** - Notes are added to database, which is for now a JSON stored in localStorage. The DOM is updated to reflect changes to this database of categories and notes in the category options and category notes display.
- **WebSocket** - Global Notepad has 4 fake notes and the interface for submitting notes to the global 'message board'. This will be replaced and the data will be gotten from the WebSocket later. These update with mock random messages from other users every few seconds.
- **application logic** - You can change the styling of categories which changes their display color. You can add and delete notes from categories, and add and delete categories themselves.

## Service deliverable

- **Node.js/Express HTTP service** - Done.
- **Static middleware for frontend** - Done.
- **Calls to third party endpoints** - Each time the category page is changed or reloaded, it displays a random sample color to re-style the category background. This is derived from a random hexcode from https://www.colr.org/json/color/random.
- **Backend service endpoints** - Endpoints for retrieving categories and updating categories.
- **Frontend calls service endpoints** - Frontend fetches categories and also 'puts' categories to update them on the backend.


## DB deliverable

- **MongoDB Atlas database created** - Done! 
- **Endpoints for data** - My get and submit categories endpoints now communicate with MongoDB, and I have extra endpoints for updating and adding singular categories which will be used later.
- **Stores data in MongoDB** - I store categories and notes in my categories database. I will also store user data to diffrentiate users' notes collections.

## Login deliverable

- **User registration** - Creates a new user in the database with their own categories/notes, token and hashed password. Existing usernames will be rejected.
- **existing user** - Verifies the user's name and password from data stored in the database, and if they don't match alerts the user.
- **Use MongoDB to store credentials** - Done.
- **Restricts functionality** - You cannot add notes without logging in.

## WebSocket deliverable

- **Backend listens for WebSocket connection** - Done, through peerProxy.js
- **Frontend makes WebSocket connection** - Done, through main.js
- **Data sent over WebSocket connection** - Notes and usernames are sent over connection.
- **WebSocket data displayed** - Global notepad populates with other user's notes in real time. (Have to use different pages with separate localStorage to see this, which should be fine since in real life different users will be on separate computers anyways.)

## React deliverable

- **Bundled** - Done with Vite.
- **Components** - Category selection 'postits', notepad, global notepad, notes list are all separate components inside their component pages.
- **Router** - Routing between main page, category page, and login/about page.
- **Hooks** - Uses effect hook to keep track of updates in username to update categories, and to load categories on first render. Uses states to keep track of notes and categories.
*Note* I still have the third-party fetch working for the random color on each page load, but am not longer coloring the categories with it (might implement this in the week to come but not right now due to time).
