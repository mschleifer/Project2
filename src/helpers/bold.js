// Example Panini helper to bold text
module.exports = function(options) {
    // options.fn(this) = Handelbars content between {{#bold}} HERE {{/bold}}
    var bolder = '<strong>' + options.fn(this) + '</strong>';
    return bolder;
  }