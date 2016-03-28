## Newsfeed
a classic newsfeed component of modern websites. Basically, this site creates a dynamically updated newsfeed of content from Flickr, SoundClound, and YouTube, using their APIs. This project has front end and back end components. 
Client-side:
-jQuery

Server-side:
-Node.js
-Mongo.DB

you may need to install MongoDB and Node on your machine using homebrew:
https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/
https://nodejs.org/en/download/

to run the app, you need to start the server. so:

```
cd ~/wherever/newsfeed
npm install
sudo npm install -g nodemon
```

install server dependencies

```
mongod --dbpath data
```

that will run in its own terminal now run

```
nodemon app.js
```

now you can run the starter application in your web browser at

```
localhost:3000
```

once you have the page up and running you can search youtube, flickr, and soundcloud for content. It will display the top result from each site. you can then watch and listen to content. you can also upvote each item or deletethem from your newsfeed. Once you are done, you can close the browser and open the page again and your data will persist. 
