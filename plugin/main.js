(() => {
    const POPUP_SELECTOR = ".mbsc-flex-1-1.mbsc-popup-content";
    const INJECT_FLAG = "data-my-injected-v1";

    function createExtra(text = "Unknown") {
        const extra = document.createElement("div");
        extra.className = "gap-sm flex items-center my-extra-block custom-injection-popup";
        extra.innerHTML = `
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="fill-current antialiased" shape-rendering="geometricPrecision">
                    <path d="M12 19.35q3.05-2.8 4.525-5.088Q18 11.976 18 10.2q0-2.725-1.738-4.462Q14.526 4 12 4T7.738 5.737Q6 7.476 6 10.2q0 1.775 1.475 4.063Q8.95 16.549 12 19.35m0 1.975a2.1 2.1 0 0 1-.7-.125 1.8 1.8 0 0 1-.625-.375A39 39 0 0 1 7.8 17.9q-1.25-1.425-2.087-2.762-.838-1.338-1.275-2.575Q4 11.325 4 10.2q0-3.75 2.412-5.975T12 2t5.587 2.225T20 10.2q0 1.125-.437 2.363-.438 1.237-1.275 2.574A21.7 21.7 0 0 1 16.2 17.9a39 39 0 0 1-2.875 2.925 1.8 1.8 0 0 1-.625.375 2.1 2.1 0 0 1-.7.125M12 12q.825 0 1.412-.588Q14 10.826 14 10t-.588-1.412A1.93 1.93 0 0 0 12 8q-.825 0-1.412.588A1.93 1.93 0 0 0 10 10q0 .825.588 1.412Q11.175 12 12 12"></path>
                </svg>
            </span>
            <div><p class="font-body-md">${text}</p></div>
        `;
        return extra;
    }

    function injectPopup(popup, text) {
        if (!popup || popup.getAttribute(INJECT_FLAG)) {
            return
        }
        popup.querySelectorAll(".my-extra-block").forEach(el => el.remove());
        popup.appendChild(createExtra(text));
        popup.setAttribute(INJECT_FLAG, "1");

        if (!popup.__observer) {
            popup.__observer = new MutationObserver(() => {
                if (!popup.querySelector(".my-extra-block")) setTimeout(() => injectPopup(popup, text), 20);
            });
            popup.__observer.observe(popup, { childList: true, subtree: true });
        }
    }

    function scanAndInject(root = document) {
        root.querySelectorAll?.(POPUP_SELECTOR).forEach(p => injectPopup(p));
        root.querySelectorAll?.("*").forEach(n => n.shadowRoot && scanAndInject(n.shadowRoot));
    }

    new MutationObserver(() => setTimeout(() => scanAndInject(document), 40))
        .observe(document.documentElement || document.body, { childList: true, subtree: true });

    document.addEventListener("click", e => {
        const event = e.target.closest(".mbsc-schedule-event");
        if (!event) return;
        const module = event.querySelector(".calendar-module")?.innerText || "Unknown Error";
        const popup = document.querySelector(POPUP_SELECTOR);
        popup && injectPopup(popup, module);
    });

    window.__myPopupInjector = { scan: () => scanAndInject(document) };
    scanAndInject(document);
    console.log("Popup injector initialized.");
})();
