class BetterGitHubStatusClear {
  static DEBUG_MODE = false;

  static get debug() {
    if (this.DEBUG_MODE) {
      return console.log.bind(window.console, "[BGHSC]");
    } else {
      return function() {};
    };
  };

  static run() {
    this.debug("Triggered.");

    const select = this.getOriginalClearStatusSelect();

    if (!select) {
      this.debug('Could not find the "clear status" select on the page. Aborting...');
      return;
    };

    if (select.classList.contains("bghsc")) {
      this.debug('Job already done. Aborting...');
      return;
    };

    select.classList.add("bghsc");
    if (!this.DEBUG_MODE) {
      select.parentElement.hidden = true;
    };

    var previousDateString = "";
    var previousTimeString = "";

    var previousDate = null;
    if (select.value != " ") {
      previousDate = new Date(select.value);
      previousDate = new Date(
        previousDate.getTime() - previousDate.getTimezoneOffset() * 60 * 1000
      );
      [previousDateString, previousTimeString] = previousDate.toISOString().split("T", 2);
      previousTimeString = previousTimeString.split(":", 3).slice(0, 2).join(":");
    };
    this.debug("Current clear date/time: " + previousDate);

    const html = `\
      <div>
        <input type="date" class="form-control" name="clear-date" value="${previousDateString}">
        <input type="time" class="form-control" name="clear-time" value="${previousTimeString}">
      </div>`;

    select.parentElement.parentElement.insertAdjacentHTML("beforeend", html);

    const that = this;
    const updateSelect = function(e) {
      that.debug("Updating select with new date...");
      const container = select.parentElement.parentElement;
      const dateString = container.querySelector("[name='clear-date']").value;
      const timeString = container.querySelector("[name='clear-time']").value;

      select.childNodes.forEach((option) => {
        if (option?.text?.startsWith("Custom")) {
          option.remove();
        };
      });

      if (dateString == "") {
        select.value = " ";
        that.debug("Erased clear date.");
      } else {
        const dateTime = new Date(`${dateString} ${timeString}`).toISOString();
        select.options.add(new Option(`Custom (${dateTime})`, dateTime, true, true));
        select.value = dateTime;
        that.debug(`Set clear date to ${dateTime}.`);
      };
    };

    select.parentElement.parentElement.querySelector("[name='clear-date']").addEventListener("input", updateSelect);
    select.parentElement.parentElement.querySelector("[name='clear-time']").addEventListener("input", updateSelect);

    this.debug("Finished.");
  };

  static ensureContext() {
    if (document.location.host !== "github.com") {
      alert("This bookmarklet only works on GitHub.");
      return false;
    };

    if (!this.getOriginalClearStatusSelect()) {
      alert("Please open the 'Set status' modal first.");
      return false;
    };

    return true;
  };

  static getOriginalClearStatusSelect() {
    return document.querySelector("#user-status-dialog-compact select#expires_at");
  };
}
