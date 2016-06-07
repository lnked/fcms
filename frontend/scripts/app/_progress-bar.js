// ================================================
// Progress bar
// ================================================

function progressBar() {
  this.win = null;
}

progressBar.prototype.init = function() {
  var min=0, max=100;

  var win = new Window("palette", "progress", [150, 150, 600, 260]);
  this.win = win;

  win.pnl = win.add("panel", [10, 10, 440, 100], "Progress");

  win.pnl.progBar      = win.pnl.add("progressbar", [20, 35, 410, 60], min, max);
  win.pnl.progBarLabel = win.pnl.add("statictext", [20, 20, 320, 35], min+"%");

  win.show();

  return true;
}

progressBar.prototype.setProgress = function(progress) {
  var win = this.win;
  var max = win.pnl.progBar.maxvalue,
      min = win.pnl.progBar.minvalue;

  // progress is always 0.0 to 1.0
  var pct = progress * max;
  win.pnl.progBar.value = pct;

  this.setLabel();
  win.update();
}

progressBar.prototype.getProgress = function() {
  var win = this.win;
  var max = win.pnl.progBar.maxvalue,
      min = win.pnl.progBar.minvalue;

  return this.win.pnl.progBar.value/max;
}

progressBar.prototype.setLabel = function() {
  this.win.pnl.progBarLabel.text = Math.round(this.win.pnl.progBar.value) + "%";
}

progressBar.prototype.setTitle = function(title) {
  this.win.pnl.text = title;
  this.win.update();
}

progressBar.prototype.increment = function(amount) {
  var amount = amount || 0.01;
  var win = this.win;
  this.setProgress(this.getProgress()+amount);
  win.update();
}

progressBar.prototype.close = function() {
    this.win.update();
    this.win.close();
}