async function checkWebGPU(id, data) {
  const results = {}
  if (navigator.gpu) {
    results.gpu = true;
    const adapter = await navigator.gpu.requestAdapter();
    if (adapter) {
      results.adapter = true;
      const device = await adapter.requestDevice();
      if (device) {
        results.device = true;
      }
    }
  }
  postMessage({id, data: results});
}

const handlers = {
  checkWebGPU,
};

self.onmessage = function(e) {
  const {command, id, data} = e.data;
  const handler = handlers[command];
  if (!handler) {
    throw new Error(`unknown command: ${command}`);
  }
  handler(id, data);
};