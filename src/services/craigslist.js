/**
 * Fetch posts from Craigslist.com
 */
import fetch from 'node-fetch';
import JobPost from '../common/post.js';
import rssparser from '../common/rssparser.js';

export default function( callback ) {

  // sources
  let service = 'Craigslist';
  let base    = 'https://newyork.craigslist.org';
  let sources = [
    '/search/cpg',
    '/search/lbg',
  ];

  // loop subs to fetch...
  for ( let sub of sources ) {

    // fetch new posts in rss format
    fetch( base + sub + '?format=rss' ).then( res => res.text() ).then( xml => {

      // parse xml response and get individual post data sent to callback
      rssparser( xml, data => {
        let { title, description, link, date, author } = data;
        if ( !title || !link || /(for hire)/gi.test( title ) ) return;

        // build post and send to callback
        const post = new JobPost();
        post.setService( service );
        post.setTitle( title );
        post.setDescription( description );
        post.setAuthor( author );
        post.setTime( date );
        post.setUrl( link );
        callback( post );
      });

    }).catch( err => {
      console.error( 'Request-Error:', err );
    });

  }

}
