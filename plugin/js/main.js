import { htmlElement } from './utils.js'

(() => {
    const POPUP_SELECTOR = ".mbsc-flex-1-1.mbsc-popup-content";
    const SCHEDULE_SELECTOR = ".mbsc-schedule-event";
    const LOCATION_SELECTOR = ".calendar-module";

    const getScheduleElement = (e) => {
        return e.target.closest(SCHEDULE_SELECTOR);
    }

    const getCalenderLocation = (event) => {
        return event.querySelector(LOCATION_SELECTOR)?.innerText || "Unknown Error";
    }

    const getPopup = () => {
        return document.querySelector(POPUP_SELECTOR);
    }

    const injectPopup = (popup, location) => {
        if(!popup){
            return
        }

        const t = popup.querySelector(".calender-item-details-wrapper")

        console.log(t)

        const e = htmlElement(location)

        console.log(e)
    }

    document.addEventListener("click", e => {
        const event = getScheduleElement(e);
        if (!event) {
            return 
        }
 
        const p = getPopup();

        injectPopup(p, getCalenderLocation(event));
    });

    console.log("Loaded Avans one fix extention")

})();
