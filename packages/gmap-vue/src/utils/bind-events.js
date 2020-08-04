export default function bindEvents(vueInst, googleMapsInst, events) {
  events.forEach((eventName) => {
    if (
      vueInst.$gmapOptions.autobindAllEvents ||
      vueInst.$listeners[eventName]
    ) {
      googleMapsInst.addListener(eventName, (ev) => {
        vueInst.$emit(eventName, ev);
      });
    }
  });
}
