/**
 * Mailgun helper class
 */
import fetch from 'node-fetch';
import FormData from 'form-data';

export default class Mailgun {

  // constructor
  constructor( config ) {
    this.config = Object.assign( { apikey: '', email: '', domain: '' }, config );
  }

  // send message using mailgun api
  sendMail( subject, message ) {
    const { apikey, email, domain } = this.config;

    // check creds
    if ( !apikey || !email || !domain ) {
      return console.log( 'Warn: Mailgun API info required to send notification emails.' );
    }

    // api endpoint info
    const method = 'POST';
    const endpoint = 'https://api.mailgun.net/v3/'+ domain +'/messages';
    const from = 'Node Script <noreply@'+ domain +'>';
    const to = 'E-mail Recipient <'+ email +'>';

    // build full html message
    const html = String(`
    <!DOCTYPE html>
    <html lang="en-US">
      <body style="margin: 0; padding: 1rem; font-size: 12px; line-height: 1.4rem;">
        ${ message }
      </body>
    </html>`).trim();

    // build auth headers for request
    const headers = {
      'Authorization': 'Basic '+ Buffer.from( 'api:'+ apikey ).toString( 'base64' ),
    };

    // build data to send
    const body = new FormData();
    body.append( 'from', from );
    body.append( 'to', to );
    body.append( 'subject', subject );
    body.append( 'html', html );

    // send request
    console.log( 'Sending email notification with Mailgun...' );
    fetch( endpoint, { method, headers, body } )
      .then( res => res.json() )
      .then( res => console.log( res ) )
      .catch( err => console.log( 'Mailgun-Error:', err ) );
  }

}
