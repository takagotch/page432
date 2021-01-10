/**
 * Wrapper for setTimeout
 */
export default function( func, secs, info ) {
  if ( !func || typeof func !== 'function' ) return;
  if ( !secs || typeof secs !== 'number' ) return;
  if ( info ) console.log( info, 'every', secs, 'seconds...' );

  let time = ( secs >= 1000 ) ? secs : 1000 * secs;
  let sto  = 0;

  // start watching
  let start = function() {
    if ( sto ) clearTimeout( sto );
    sto = setTimeout( start, time );
    func();
  }

  // stop watching
  let stop = function() {
    if ( sto ) clearTimeout( sto );
    sto = 0;
  }

  // export interface
  return { start, stop };
}
