export default function bindEvents(vueInst, googleMapsInst, events) {
  events.forEach((eventName) => {
    if (
      vueInst.$gmapOptions.autobindAllEvents
    ) {
      googleMapsInst.addListener(eventName, (ev) => {
        vueInst.$emit(eventName, ev);
      });
    }
  });
}
