NTTS-Coding-Exercise

Author
	Robert Clarkson
	Email: robert.clarkson.work@gmail.com
	LinkedIn: https://www.linkedin.com/in/robert-clarkson-5856621b7/
	GitHub: https://github.com/robertIanClarkson 

Indroduction
	I used ExpressJS because it is easy to run on other people's machines.
	All you need is 'Node.js' and 'npm' which most people have or can easily install.
	I decided to keep my project in the regular ExpressJS layout because it is well organized.
	Git and GitHub where used (private repo) and can be shared with you on your request.
	That being said I created a directory 'submission_files' adjacent to 'server' which holds the files asked for just in case (only for viewing purposes).
	I also shared the relevant paths below.

Relevant Files
	server-side
		NTTS-Coding-Exercise/server/bin/www - file - entry point of application
		NTTS-Coding-Exercise/server/routes/index.js - file - server-side scripting for HTTP requests
		NTTS-Coding-Exercise/server/routes/api/jsonHandler.js - file - server-side scripting for handling patent metrics
	
	client-side
		NTTS-Coding-Exercise/server/views/ - directory - "HTML" components (pug)
		NTTS-Coding-Exercise/server/views/index.html - file - HTML file created by pug
		NTTS-Coding-Exercise/server/public/javascripts/graphs.js - file - jQuery POST request & Chart.js rendering 
		NTTS-Coding-Exercise/server/public/stylesheets/style.css - file - CSS styling for project
	
	just-in-case
		NTTS-Coding-Exercise/submission_files/ - directory - holds a copy of all the relevant files
		NOTE: The application will only run from within the 'server' directory, these files are just for viewing purposes.

Deployment
	Prerequisites
		Node (14.13.1 was used in development)
		npm (6.14.8 was used in development)

	Installing
		Travel to the 'NTTS-Coding-Excercise' directory in your terminal
			$ cd NTTS-Coding-Exercise
		
		Enter the `server` directory
			$ cd server

		Install all the needed packages
			$ npm install
			
	Running
		Start the server from inside the directory 'NTTS-Coding-Exercise/server'
			$ npm start

Usage
	Visit your localhost, port 3000
		- http://localhost:3000/

	Notice the initial loading animations

	Use your mouse to hover over the various bars and slices of the graphs to see their responsive animations.

	Click some bars and slices. You should be redirected to an NTTP search in a new tab.

	Click some cubes in the pie chart's legend, they should disable

	Resize your window to see the whole page's responsiveness.

	Some Notes:
		Code is well organized, scalable, easy to understand, and well commented.
		Client side jQuery POST request to server for patent metrics.
		JSON handler to build patent metrics
		Error Handling
		Responsive Design
		Imported Fonts from Google Fonts	
		Tailored Chart.js Bar & Pie Charts, with:
			- Altered Loading animations
			- Custom color palettes
			- Custom dynamic gradient colors
			- Imported fonts 
			- Mouse hover animations 
			- Mouse click events

Built With
	OS
    	macOS
    	Ubuntu
	
	IDE
    	Visual Studio Code
	
	Version Control System
    	git & GitHub
	
	Node Packages
    	cookie-parser
    	debug
    	express
    	http-errors
    	morgan
    	nodemon
    	pug
	
	CDN
    	jQuery
    	Chart.js
    	Bootstrap
    	Google Fonts

Tested On
	Google Chrome (Windows, Android, Mac, iPhone, iPad)
	Mozilla Firefox (Windows, Android, Mac, iPhone, iPad)
	Apple Safari (Mac, iPhone, iPad)
	Microsoft Edge (Windows)

