class BetterGitHubStatusClear {
  static run() {
    const clearStatusDiv = document
      .querySelector("input.js-user-status-expiration-date-input:not(.better-gh-status-clear)")
      ?.parentElement;

    if (!clearStatusDiv?.checkVisibility()) {
      return;
    }

    var previousDateString = "";
    var previousTimeString = "";
    var helpMessage = "";

    const previousDateMatch = clearStatusDiv
      .querySelector(".js-user-status-expiration-interval-selected")
      .textContent
      .trim()
      .match(/^in (?<count>\d+) (?<unit>minute|hour|day|month|year)s?$/);

    if (previousDateMatch) {
      const count = parseInt(previousDateMatch.groups.count);
      var previousDate = new Date();

      switch (previousDateMatch.groups.unit) {
        case "minute":
          previousDate.setMinutes(previousDate.getMinutes() + count);
          break;
        case "hour":
          previousDate.setHours(previousDate.getHours() + count);
          break;
        case "day":
          previousDate.setDate(previousDate.getDate() + count);
          break;
        case "month":
          previousDate.setMonth(previousDate.getMonth() + count);
          break;
        case "year":
          previousDate.setFullYear(previousDate.getFullYear() + count);
          break;
      };

      const offset = previousDate.getTimezoneOffset();
      previousDate = new Date(previousDate.getTime() - offset * 60 * 1000);

      [previousDateString, previousTimeString] = previousDate.toISOString().split("T", 2);

      previousTimeString = previousTimeString.split(":", 3).slice(0, 2).join(":");
      helpMessage = `\
        <p class="f6 mt-2">
          (GitHub only returns an imprecise clear date, so the value selected above is likely inaccurate.)
        </p>`;
    };

    const html = `\
      <div class="f5 pt-3 pb-2">
        <div class="d-inline-block mr-2">Clear status</div>
        <input type="date" class="form-control" name="clear-date" value="${previousDateString}">
        <input type="time" class="form-control" name="clear-time" value="${previousTimeString}">
        ${helpMessage}
        <input class="js-user-status-expiration-date-input better-gh-status-clear" type="hidden" name="expires_at" value="">
      </div>`;

    clearStatusDiv.insertAdjacentHTML("beforebegin", html);

    const updateHiddenInput = function(e) {
      const hiddenInput = document.querySelector(".js-user-status-expiration-date-input");
      const dateString = hiddenInput.parentElement.querySelector("[name='clear-date']").value;
      const timeString = hiddenInput.parentElement.querySelector("[name='clear-time']").value;

      if (dateString == "") {
        hiddenInput.value = "";
        console.log("Erased clear date.");
      } else {
        dateTime = new Date(`${dateString} ${timeString}`);
        hiddenInput.value = dateTime.toISOString();
        console.log(`Set clear date to ${dateTime}.`);
      };
    };

    clearStatusDiv.parentElement.querySelector("[name='clear-date']").addEventListener("input", updateHiddenInput);
    clearStatusDiv.parentElement.querySelector("[name='clear-time']").addEventListener("input", updateHiddenInput);

    clearStatusDiv.remove();
  }
}

