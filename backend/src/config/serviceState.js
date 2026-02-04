const ServiceState = Object.freeze({
  READY: "READY",
  DB_DISABLED: "DB_DISABLED",
  DEGRADED: "DEGRADED",
});

let currentState = ServiceState.READY;
let updatedAt = new Date().toISOString();

const setServiceState = (state) => {
  if (!Object.values(ServiceState).includes(state)) {
    return;
  }
  currentState = state;
  updatedAt = new Date().toISOString();
};

const getServiceState = () => currentState;

const getServiceSnapshot = () => ({
  state: currentState,
  updatedAt,
});

export { ServiceState, getServiceSnapshot, getServiceState, setServiceState };
