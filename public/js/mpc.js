var MPC = function () {
  var self = this;
  var socket = null;
  this.idPrefix = 'btn-'; // HTML ID prefix
  this.keys = {
    '1': 0,
    '2': 1,
    '3': 2,
    '4': 3,
    'q': 4,
    'w': 5,
    'e': 6,
    'r': 7,
    'a': 8,
    's': 9,
    'd': 10,
    'f': 11,
    'z': 12,
    'x': 13,
    'c': 14,
    'v': 15
  }

  this.showProgress = function () {
  };

  this.onload = function () {
    var sID = this.id;
  };

  this.onfinish = function () {
  };

  this.onplay = function () {
    var button = self._getButton(this.id);
    button.addClass('active');
    setTimeout(function () {
      button.removeClass('active');
    }, 200);
  };

  this.whileplaying = function () {
  };

  this._keyHandler = function (e) {
    var oEvt = e ? e : event;
    var sChar = String.fromCharCode(oEvt.keyCode).toLowerCase();
    if (typeof self.keys[sChar] != 'undefined')
      self.clickMpcButton(self.keys[sChar]);
  };

  this._getButton = function (sID) {
    return $('#' + sID);
  };

  this._reset = function (sID) {
    var id = sID;
  };


  this.init = function () {
    document.onkeydown = self._keyHandler;
    self.socket = io.connect('http://localhost:3000');

    self.socket.on('sound.play', self._socketSoundPlayHandler);
    self.socket.on('user.connected', self._updateUsers);
    self.socket.on('user.disconnected', self._updateUsers);

    $('span').mousedown(function (e) {
      e.preventDefault();
    });


  };

  this._socketSoundPlayHandler = function (msg) {
    self.playButton(msg);
  };

  this._updateUsers = function (msg) {
     $('.js-users-connected').html(msg);
  };

  this.clickMpcButton = function (button) {
    self.socket.emit('button.pressed', button);
    self.playButton(button);
  };

  this.playButton = function (button) {
    soundManager.play("s" + button);
  };

};


var mpc = new MPC();

soundManager.flashVersion = (window.location.toString().match(/#flash8/i) ? 8 : 9);
if (soundManager.flashVersion != 8) {
  soundManager.useHighPerformance = true;
}

soundManager.setup({
  url: '../../swf/', // path to load SWF from (overriding default)
  bgColor: '#333333',
  wmode: 'transparent',
  debugMode: false,
  preferFlash: false,
  html5PollingInterval: 50,
  ignoreMobileRestrictions: true,
  onready: function () {
    soundManager.setup({
      defaultOptions: {
        autoLoad: true,
        multiShot: true,
        whileloading: mpc.showProgress,
        onid3: mpc.onid3,
        onload: mpc.onload,
        onplay: mpc.onplay,
        whileplaying: mpc.whileplaying,
        onfinish: mpc.onfinish
      }
    });

    mpc.init();

    for (var i = 0; i < 12; i++) {
      soundManager.createSound({
        id: 's' + i,
        url: 'audio/s' + i + '.mp3'
      });
    }

  }
});



