function Messages () {
  this.messages = [];
}

Messages.prototype.fetch = function () {
  return this.messages;
}

Messages.prototype.add = function (message) {
  this.messages.push(message);
}

module.exports = Messages;

