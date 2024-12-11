(() => {
  var t = window,
    a = document,
    p = "https://webofferwall.tapjoy.com/sdk/latest",
    j = "Tapjoy";

  if (typeof t[j] === "function") {
    t[j]("activator-reinitialized");
  } else {
    t[j] = function () {
      (t[j].q = t[j].q || []).push(arguments);
    };
    t[j].l = 1 * new Date();

    const script = a.createElement("script");
    const firstScript = a.getElementsByTagName("script")[0];
    script.async = 1;
    script.src = p;
    firstScript.parentNode.insertBefore(script, firstScript);
  }
})();

Tapjoy("init", {
  sdkKey: "wB0HwNKnQFS9p9-KBGSS2AECmK2pL2zOwjBVvzLtxqgBof1jxfiZnJrNHMaI",
  publisherUserId: "c01d07c0-d2a7-4054-bda7-df8a046492d8",
  eventName: "appcoin", // Ganti sesuai kebutuhan
  logger: console,
});
