/**
 * Collection helper class
 */
import fs from 'fs';

export default class Collection {

  // constructor
  constructor() {
    this.posts = [];
  }

  // check if a post is valid
  isPost( post ) {
    if ( !post || typeof post !== 'object' ) return false;
    if ( !post.title || !post.url ) return false;
    return true;
  }

  // check if a post exists
  hasPost( post ) {
    if ( this.isPost( post ) ) {
      for ( let p of this.posts ) {
        if ( p.title === post.title ) return true;
        if ( p.url === post.url ) return true;
      }
    }
    return false;
  }

  // add new post to the collecion
  addPost( post ) {
    if ( !this.isPost( post ) || this.hasPost( post ) ) return;
    this.posts.push( post );
  }

  // remove a post from collection
  removePost( post ) {
    this.posts = this.posts.filter( p => {
      return ( p.title !== post.title && p.url !== post.url );
    });
  }

  // loop colleciton
  forEach( callback ) {
    this.posts.forEach( callback );
  }

  // get total posts in collection
  getTotal() {
    return this.posts.length;
  }

  // get posts json data
  getJson() {
    let list = [];
    for ( let post of this.posts ) {
      let { service, title, description, author, time, url } = post;
      list.push( { service, title, description, author, time, url } );
    }
    return JSON.stringify( list, null, 2 );
  }

  //  test each post title against a regex and return new list
  getMatch( regex, callback ) {
    let out = [];

    for ( let post of this.posts ) {
      if ( !post.isnew ) continue;
      if ( !regex.test( post.title ) ) continue;
      post.isnew = false;
      out.push( post );
    }
    if ( typeof callback === 'function' ) {
      callback( out );
    }
    return out;
  }

  // save post collection to a file
  saveToFile( file, callback ) {
    if ( !this.posts.length ) return;
    fs.writeFile( file, this.getJson(), 'utf8', callback );
  }

}
