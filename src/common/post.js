/**
 * Post entry class
 */
export default class Post {

  // post constructor
  constructor() {
    this.isnew = true;
    this.service = '';
    this.title = '';
    this.description = '';
    this.author = '';
    this.time = Date.now();
    this.date = '';
    this.url = '';
  }

  // set the post title
  setService( str ) {
    this.service = String( str || '' ).trim();
  }

  // set the post title
  setTitle( str ) {
    str = String( str || '' );
    this.title = this._collapse( str, '' );
  }

  // set the post description
  setDescription( str ) {
    str = String( str || '' );
    this.description = this._collapse( str, 'No description provided.' );
  }

  // set the post author
  setAuthor( str ) {
    str = String( str || '' );
    this.author = this._collapse( str, 'No author' );
  }

  // set the post date/time
  setTime( time ) {
    const now = Date.now();
    const date = new Date( time || now );
    this.time = date.getTime() || now;
    this.date = date.toString();
  }

  // set the post url
  setUrl( str ) {
    str = String( str || '' );
    this.url = str;
  }

  // build post entry text
  getText() {
    return [ this.title, this.description, this.url ].join( "\n\n" );
  }

  // build post entry html
  getHtml() {
    return `
    <div style="${this._css()}">
      <p><big><b>${this.title}</b></big></p>
      <p><a href="${this.url}"><b>${this.url}</b></a></p>
      <p><small style="opacity: .5"><b>${this.service}, Posted</b> ${this.date}</small></p>
    </div>`;
  }

  // check if post title matches a regex pattern
  testMatch( regex ) {
    if ( regex && this.title ) {
      return regex.test( this.title );
    }
    return false;
  }

  // remove unwanted whitespace from string
  _collapse( str, fallback ) {
    str = str.replace( /[\s\t\r\n\ ]+/g, ' ' );
    str = str.replace( /\s\s+/g, ' ' );
    str = str.trim();
    return str || fallback || '';
  }

  // css style used for each post in html output
  _css() {
    return [
      'font-family: Monaco, Consolas, monospace',
      'margin: 0 0 1rem 0',
      'padding: 1rem 2rem',
      'background-color: rgba(0,0,0,.05)',
      'border-radius: 6px',
    ].join( '; ' );
  }

}
