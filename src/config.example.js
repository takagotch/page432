/**
 * App config
 */
export default {

  // how often to fetch data from remote sources
  fetchSeconds: 300,

  // how often to check for notification matches
  notifySeconds: 60,

  // keywords to match for notification
  notifyRegex: /\bvue|react|node|javascript|sass|html|php|developer|programmer|engineer|coder|api|(front|back)\-?end\b/i,

  // folder/file location to save posts to
  saveFile: 'json/posts.json',

  // mailgun options
  mailgun: {
    apikey: 'key-hash',
    email: 'you@domain.com',
    domain: 'domain.com'
  },


}
