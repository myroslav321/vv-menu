For using plugin you should add a wrapper with the class 'slide-menu'.
Menus can be nested endlessly to create the desired hierarchy.
If you wish to programmatically control the menu, you should also set an ID.
 
Create the menu then like this:

const menuElement = document.getElementById('example-menu');
const menu = new SlideMenu(menuElement);


~
The SlideMenu() constructor takes an optional second parameter (an object {}) to pass in various options:

  Option  /  Description/  Valid values  /  Default
- backLinkAfter  /  HTML to append to back link in submenus  /  HTML code  /  ''
- backLinkBefore /  HTML to prepend to back link in submenus  /	HTML code  /  '<span class="prew-default-double-arrows"> Back </span>'
- keycodeClose / Key used to close the menu / Any valid KeyboardEvent key /	undefined
- keycodeOpen /	Key used to open the menu	/ Any valid KeyboardEvent key /	undefined
- position	/ Position of the menu /	'left' or 'right' /	'right'
- showBackLink	/ Add a link to navigate back in submenus (first entry) / 	boolean /	true
- submenuLinkBefore	/ HTML to prepend to links with a submenu /	HTML code /	''
- submenuLinkAfter	/ HTML to append to links with a submenu / HTML code /	'<span class="next-default-arrow"></span>'
- slideContent  / class name of element which should be slided with menu  / 'main-content' / ''
- saveMenuState  / Save state of  menu after closing  / boolean /  true

Example:
const menu = new SlideMenu(document.getElementById('example-menu'),{
     showBackLink: false,
     submenuLinkAfter: ' <strong>⇒</strong>',
     slideContent: 'main-content',
     saveMenuState: false
 });
~
~
Methods
- close(animate = true) - Close the menu
- back() - Navigate on level back if possible
- destroy() - revert all DOM changes made by SlideMenu. This includes inline styles, but not the slide-menu class name for the container element.
- navigateTo(target) Open the menu level which contains specified menu element. target can either be a document.querySelector compatible string selector or the the DOM element (inside the menu). The first found element (if any) will be used.
- open(animate = true) - Open the menu
- toggle(animate = true) - Toggle the menu
~

~
Events
SlideMenu emits events for all kind of actions, which trigger as soon as the action is method is called. Plus, all events have also an <event>-after equivalent, which is fired after the step is complete (completely animated).

sm.back[-after] fires immediately when navigating backwards in the menu hierarchy or after the animation is complete respectively.
sm.close[-after] fires immediately when the close() method is called or after the animation is complete respectively.
sm.forward[-after]fires immediately when navigating forward in the menu hierarchy or after the animation is complete respectively.
sm.navigate[-after]fires immediately when calling the navigateTo() method or after the animation is complete respectively.
sm.open[-after] fires immediately when the open() method is called or after the animation is complete respectively.
~

~
Control buttons
Buttons to control the menu can be created easily. Add the class slide-menu__control to anchors or buttons and set the data attributes target to the ID of the desired menu and action to the API method:

<button type="button" class="slide-menu__control" data-action="open">Open</button>
<button type="button" class="slide-menu__control" data-action="back">Back</button>
Inside the menu container the attribute data-target can be omitted or set to to the string this to control this menu.

<a class="slide-menu-control" data-action="close">Close this menu</a>
<a class="slide-menu-control" data-target="this" data-action="close">Close this menu</a>
~

