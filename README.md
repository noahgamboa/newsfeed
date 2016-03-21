## Newsfeed
a classic newsfeed component of modern websites. Basically, this site creates a dynamically updated newsfeed of content from Flickr, SoundClound, and YouTube, using their APIs. This project has front end and back end components. 
Client-side:
-jQuery

Server-side:
-Node.js
-Mongo.DB

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

now you can run the starter application at

```
localhost:3000
```
