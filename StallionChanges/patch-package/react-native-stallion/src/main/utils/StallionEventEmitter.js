class EventEmitter {
  events = [];

  // Method to add event listener
  addEventListener(listener) {
    this.events.push(listener);
  }

  // Method to remove event listener
  removeEventListener(listenerToRemove) {
    this.events = this.events.filter(listener => listener !== listenerToRemove);
  }

  // Method to emit an event
  emit(data) {
    this.events.forEach(listener => listener(data));
  }
}
export const stallionEventEmitter = new EventEmitter();
//# sourceMappingURL=StallionEventEmitter.js.map