/**
 * Parse RSS/Atom string
 * https://en.wikipedia.org/wiki/Atom_(Web_standard)
 * https://en.wikipedia.org/wiki/RSS
 */
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

export default function( xml, callback ) {
  const _dom     = new JSDOM( xml, { contentType: 'text/xml' } );
  const _doc     = _dom ? _dom.window.document : null;
  const _items   = _doc ? _doc.querySelectorAll( 'item' ) : []; // rss
  const _entries = _doc ? _doc.querySelectorAll( 'entry' ) : []; // atom

  // resolve final list
  let _list = [];
  _list = _items.length   ? _items   : _list;
  _list = _entries.length ? _entries : _list;

  // loop list items
  _list.forEach( el => {

    // look for entry title (atom/rss)
    let title = el.querySelector( 'title' );
    title = title ? title.textContent : '';

    // look for entry link (atom/rss)
    let link = el.querySelector( 'link' );
    link = link ? link.getAttribute( 'href' ) || link.textContent : '';

    // look for entry pubDate (rss)
    let pubDate = el.querySelector( 'pubDate' );
    pubDate = pubDate ? pubDate.textContent : '';

    // look for entry updated (atom)
    let updated = el.querySelector( 'updated' );
    updated = updated ? updated.textContent : '';

    // look for author updated (atom)
    let author = el.querySelector( 'author > name' );
    author = author ? author.textContent : '';

    // look for entry summary (atom)
    let summary = el.querySelector( 'summary' );
    summary = summary ? summary.textContent : '';

    // look for entry description (rss)
    let desc = el.querySelector( 'description' );
    desc = desc ? desc.textContent : '';

    // resolve final stuff
    let description = desc || summary || '';
    let date = pubDate || updated || '';

    // send data to callback
    callback( { title, description, link, date, author } );
  });
}
