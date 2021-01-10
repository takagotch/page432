/**
 * Server file.
 */
import config from './src/config.js';
import Collection from './src/common/collection.js';
import Mailgun from './src/common/mailgun.js';
import watcher from './src/common/watcher.js';

// remote services
import reddit from './src/services/reddit.js';
import craigslist from './src/services/craigslist.js';

// setup helpers
const mailer = new Mailgun( config.mailgun );
const collection = new Collection();

// fetch data from remote sources
const fetchPosts = function() {
  reddit( post => collection.addPost( post ) );
  craigslist( post => collection.addPost( post ) );
};

// check posts for notification match
const checkNotify = function() {

  // send email notification for posts that match a custom regex
  collection.getMatch( config.notifyRegex, posts => {
    if ( !posts.length ) return;
    let subject = 'New Job Posts ('+ posts.length +')';
    let message = posts.reduce( ( a, post ) => a + post.getHtml(), '' );
    mailer.sendMail( subject, message );
  });

  // save all posts to a file
  collection.saveToFile( config.saveFile, err => {
    if ( err ) return console.log( err.message || err );
  });
}

// init data fetching and watching
watcher( fetchPosts, config.fetchSeconds, 'Fetching remote posts' ).start();
watcher( checkNotify, config.notifySeconds, 'Sending notifications' ).start();
