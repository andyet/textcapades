#Textcapades

This is a port of the original textcapades story to a format where you
can play online, instead of via SMS or Slack.

## Installing

```shell
$ git clone (git url)
$ cd textcapades
$ npm install
$ npm start
```

Then open your browser to localhost:3001

## Layout

### Config

Configuration is in the `./config` folder.  Everything in `default.json`
is always set.  If you want to override any of those settings put them
into `local.json`.  For instance, to make the server listen on port 8000
instead your `local.json` would look like:

```json
{
    "hapi": {
        "port": 8000
    }
}
```

You should definitely at least change the auth password and crumb key in
your own deployment.


### Web content

All of the web content is in `./web`.  The `index.js` file defines the
routes for all assets and pages.  The `./web/controllers/` folder is
where the handlers for all the web routes are defined.  By default,
everything in `./web/public` is served relative to the `/` url.  Css,
js, and images are all assets found in this folder.

 The `./web/templates` folder is where the jade files for the handlers
are defined.  For example a handler that specifies `reply.view('story')`
would serve the jade file found at `./web/templates/story.jade`


### Story API

The routes that power the story is in `./api`.  These are the routes
that will interact with and affect the user session data that the
`./web` content will then render.


### Engine

The actual engine powering the story is in `./engine`  These are methods
that are passed the current user state in order to find out how to
appropriately alter it, letting `./api` then apply that state to the
session.


### Story data

The raw story messages are in `./engine/story`


### Notes

At this early phase, the idea is that `./engine` contains all the things
that could potentially be swapped out to "run" a new story.  The methods
exposed via `./engine` that are called by `./api` is the "story
interface" as such.
