/* NSW Early Childhood Career Hub — shared page behaviour (no dependencies) */
(function () {
  "use strict";

  // Browser storage can be unavailable (private mode, blocked site data); fail quietly.
  var store = {
    get: function (key, fallback) {
      try { var v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
      catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    }
  };
  window.HubStore = store;

  // Roadmap checklist (index)
  var steps = document.querySelectorAll(".timeline [data-step]");
  if (steps.length) {
    var done = store.get("hub.roadmap", {});
    var bar = document.getElementById("progressBar");
    var label = document.getElementById("progressLabel");
    var update = function () {
      var n = 0;
      steps.forEach(function (box) {
        var li = box.closest("li");
        li.classList.toggle("done", box.checked);
        if (box.checked) n++;
      });
      if (bar) bar.style.width = Math.round((n / steps.length) * 100) + "%";
      if (label) label.textContent = n + " of " + steps.length + " steps done";
    };
    steps.forEach(function (box) {
      box.checked = !!done[box.getAttribute("data-step")];
      box.addEventListener("change", function () {
        done[box.getAttribute("data-step")] = box.checked;
        store.set("hub.roadmap", done);
        update();
      });
    });
    update();
  }

  // Personal deadline tracker (index)
  var dlForm = document.getElementById("dlForm");
  if (dlForm) {
    var dlList = document.getElementById("dlList");
    var dlEmpty = document.getElementById("dlEmpty");
    var items = store.get("hub.deadlines", []);
    var renderDeadlines = function () {
      items.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
      dlList.innerHTML = "";
      var today = new Date().toISOString().slice(0, 10);
      items.forEach(function (item, i) {
        var li = document.createElement("li");
        if (item.date < today) li.className = "overdue";
        var text = document.createElement("span");
        text.textContent = item.date + " — " + item.what + (item.date < today ? " (passed)" : "");
        var del = document.createElement("button");
        del.type = "button";
        del.textContent = "Remove";
        del.setAttribute("aria-label", "Remove " + item.what);
        del.addEventListener("click", function () {
          items.splice(i, 1);
          store.set("hub.deadlines", items);
          renderDeadlines();
        });
        li.appendChild(text);
        li.appendChild(del);
        dlList.appendChild(li);
      });
      dlEmpty.classList.toggle("hidden", items.length > 0);
    };
    dlForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var what = dlForm.elements.what.value.trim();
      var date = dlForm.elements.date.value;
      if (!what || !date) return;
      items.push({ what: what, date: date });
      store.set("hub.deadlines", items);
      dlForm.reset();
      renderDeadlines();
    });
    renderDeadlines();
  }

  // Sortable tables (courses)
  document.querySelectorAll("table[data-sortable]").forEach(function (table) {
    var tbody = table.tBodies[0];
    table.querySelectorAll("th button.sort").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var th = btn.closest("th");
        var col = Array.prototype.indexOf.call(th.parentNode.children, th);
        var dir = th.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending";
        table.querySelectorAll("th").forEach(function (h) { h.removeAttribute("aria-sort"); });
        th.setAttribute("aria-sort", dir);
        var rows = Array.prototype.slice.call(tbody.rows);
        rows.sort(function (a, b) {
          var x = parseFloat(a.cells[col].getAttribute("data-sort"));
          var y = parseFloat(b.cells[col].getAttribute("data-sort"));
          return dir === "ascending" ? x - y : y - x;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
      });
    });
  });

  // Course filters (courses)
  var fOnline = document.getElementById("fOnline");
  var fEct = document.getElementById("fEct");
  if (fOnline && fEct) {
    var countEl = document.getElementById("courseCount");
    var applyCourseFilter = function () {
      var shown = 0;
      document.querySelectorAll("#courseTable tbody tr").forEach(function (row) {
        var hide = (fOnline.checked && row.getAttribute("data-online") !== "1") ||
                   (fEct.checked && row.getAttribute("data-ect") !== "1");
        row.classList.toggle("hidden", hide);
        if (!hide) shown++;
      });
      if (countEl) countEl.textContent = shown + " courses shown";
    };
    fOnline.addEventListener("change", applyCourseFilter);
    fEct.addEventListener("change", applyCourseFilter);
    applyCourseFilter();
  }

  // Resource search (resources)
  var resSearch = document.getElementById("resSearch");
  if (resSearch) {
    var resCount = document.getElementById("resCount");
    resSearch.addEventListener("input", function () {
      var q = resSearch.value.trim().toLowerCase();
      var total = 0;
      document.querySelectorAll("h2.group-title").forEach(function (h) {
        var list = h.nextElementSibling;
        var visible = 0;
        list.querySelectorAll("li").forEach(function (li) {
          var match = !q || li.textContent.toLowerCase().indexOf(q) !== -1 || h.textContent.toLowerCase().indexOf(q) !== -1;
          li.classList.toggle("hidden", !match);
          if (match) visible++;
        });
        h.classList.toggle("hidden", visible === 0);
        list.classList.toggle("hidden", visible === 0);
        total += visible;
      });
      resCount.textContent = q ? total + " matching links" : "";
    });
  }
})();
