(() => {
  if (document.location.host !== "github.com") {
    alert("This bookmarklet only works on GitHub.");
    return;
  };

  const clearStatusDiv = document.querySelector("input.js-user-status-expiration-date-input")?.parentElement;

  if (!clearStatusDiv?.checkVisibility()) {
    alert("Please open the 'Set status' modal first.");
    return;
  };

  const html = `\
    <div class="f5 pt-3 pb-2">
      <div class="d-inline-block mr-2">Clear status</div>
      <input type="date" class="form-control" name="clear-date">
      <input type="time" class="form-control" name="clear-time">
      <p class="f6 mt-2">
        (Unfortunately, it is impossible, at this time, to retrieve the previously chosen clear date/time.)
      </p>
      <input class="js-user-status-expiration-date-input" type="hidden" name="expires_at" value="">
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
})();
