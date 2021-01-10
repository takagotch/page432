/**
 * Fetch posts from Reddit.com
 */
import fetch from 'node-fetch';
import JobPost from '../common/post.js';

export default function( callback ) {

  // sources
  let service = 'Reddit';
  let base    = 'https://reddit.com';
  let sources = [
    '/r/Jobs4Bitcoins',
    '/r/sysadminjobs',
    '/r/forhire',
    '/r/hiring',
  ];

  // loop subs to fetch...
  for ( let sub of sources ) {

    // fetch new posts in json format
    fetch( base + sub + '/new/.json' ).then( res => res.json() ).then( json => {

      // check output data
      if ( !json || !json.data || !json.data.children ) return;

      // loop entries from fetched output
      for ( let entry of json.data.children ) {

        let { title, selftext, url, author, created_utc } = entry.data;
        if ( !title || !url || /(for hire)/gi.test( title ) ) continue;

        // build post and send to callback
        const post = new JobPost();
        post.setService( service );
        post.setTitle( title );
        post.setDescription( selftext );
        post.setAuthor( author );
        post.setTime( created_utc );
        post.setUrl( url );
        callback( post );
      }

    }).catch( err => {
      console.error( 'Request-Error:', err );
    });
  }
}
