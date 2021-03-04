# Portfolio #

## Motivation / Background ##

I decided to make this app in Angular to demonstrate my working ability with Angular, although I'll be the first to admit that the app's complexity (barring some features) would be better suited to a non-framework approach.

It is deployed with Google Cloud and built with Tailwind. This was my first time using Tailwind instead of CSS or Bootstrap for a full project and my takeaway is that its speed really suited designing and building at the same time. However, I'm not convinced that the lack of CSS structure would validate the speed in larger projects. The app is also designed responsively to work on many screens; a section where Tailwind was actually very helpful.


***
## Angular Features ##

This project was generated with Angular10 and features routing, angular animations, multiple components, directives, hostlisteners, route guards, services, and more! 

There are four custom components: _about_, _home_, _hover-photo_, and _projects_. These correspond to each of the 3 pages of the app and the popup photo in the top right corner. The app serves these up with _routerLinks_ placed in the main _app.component_ template. 

### App Component ### 
* The main App Component is where the router navigation is contained. To determine the current path, I subscribed to _router.events_ and reacted to the _event.url_. On the HTML side I used _ngClass_ to style these links/routerLinks based on the previous information (Note: in hindsight, _routerLinkActive_ is definitely the better way to achieve this). 

* Initially I decided to write the navigation header just once in this component to reduce redundancy, but the resulting difficulties with screen sizes and viewport units negated the benefits. 

* One complex area that could justify the lack of redundancy is the setup for the mobile navigation here. Instead of displaying all links, the mobile view shows a hamburger menu and then a popup vertical navigation bar and a semi-opaque background over the whole screen. The hamburger icon is hidden at all screen sizes except for mobile. It has a click handler to enable the popup display, which toggles custom Tailwind classes through _ngClass_ directives. While this navigation bar would be quicker to add from Angular Material, I decided to implement it from scratch for good practice and because it would have been my only Material dependence.

### Hover-Photo ###
* The hover-photo uses Angular Animations to transition from the void state of no display to being displayed (a special use case of Angular Animations). It is displayed when the user hovers over the initials in the top corner AND the user is not currently on the homepage. The first of these conditions is determined by a _HostListener('mouseover')_. The second is an input from the App Component. When the user mouses away _('mouseleave')_ the popup is animated away too. Because this animation takes half a second, it caused a problem where the user could mouse away from the initials and then mouse on to the photo popup, thereby creating the unwanted behavior of keeping the popup displayed. To fix this, I added a timeout the same length of the animation so that activating the popup can only be triggered through the initials.

* For similar mouse actions in the past I've used directives. But this time a component seemed like the best option because the mouse actions are associated with HTML code (i.e., a template), albeit a small one.

### Home Page/Component ###
* For the home page I wanted to have the design fill the entire screen. For desktop screens this is easy to achieve with the CSS _calc()_  function. But for mobile the browser bars--specifically the temporary bottom bar--hinders this. For mobile I wanted it to generate the correct height once based on the view height and not update it each time that bottom browser bar pops up. So I solved it by calculating the height based on the initial height and the nav element and then using _ngStyle_ to set the height. This value is saved in _localStorage_.

* One recent addition is the animation of the circular icon elements around the profile photo. The animation is done manually by increasing the index of each icon in a _setInterval_. By changing the index the positioning directive recalculates the new position in degrees, then in cartesian, then in CSS position values. 

### Diagonal / Gradient Background ###
* I decided to continue the thematic look of the new diagonal line on the home page by adding a matching grey background on the other pages. Because of the page setup it was not a direct process to add the background to each page separately (although it definitely is possible by passing around height values). Consequently, when switching between the two differently sized pages, the diagonal background would pop and slide into place during and continuing after the animation. To combat this I decided to add a _canDeactivate_ route guard which removes the background class upon route change and adds it back in after the duration of the page slide animation.

***
## Attributions ##

The teal honeycomb background image on the home page footer is a SVG pattern created by Steve Schoger, as found on his website [Hero Patterns](http://www.heropatterns.com/), CC 4.0.



