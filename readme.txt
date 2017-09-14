Steps to run the Application
----------------------------
----------------------------

Below instructions are for WINDOWS Operating System.
NOTE: Please find appropriate steps to do the same for respective Operating Systems. Inconvenience regretted.

-> Installing the required software
-----------------------------------
1. Download the latest version of Node JS from 'https://nodejs.org' and install in your system.
NOTE: The steps to download and install Node JS for other Operating Systems such as Ubuntu can be found on the Website.

-> Installing the required packages
-----------------------------------
1. Go to the client folder in your terminal and run 'npm install'.
NOTE:
I) Run the appropriate command to install the packages based on your Operating system.
Eg: In Ubuntu, you need to run 'sudo npm install'

II) For some packages such as webpack, you may have to install the package globally
using the command 'npm install -g webpack'.
If you get any error for a module (Eg: 'xyx' module) displayed as 'Cannot find module xyz',
you may have to install that package globally using the above mentioned command i.e., 'npm install -g xyz'

2. Go to the server folder in terminal and repeat the above steps for install the server side packages.

-> Running the application
--------------------------
1. Go to client folder in terminal and run the command 'webpack'.
2. Go to server folder in terminal and run the command 'npm start'.
3. Open a browser and enter the url 'http://localhost:8080'.

NOTE: You can also open 2 terminals and in one, go to the client folder and run the webpack watch command 'webpack -w'.
And in the second terminal, go to the client folder and run the command 'npm start'.
