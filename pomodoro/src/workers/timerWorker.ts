self.onmessage = function (e) {
  console.log('Worker Recebeu: ', e.data);

  self.postMessage(`Ok google`);
};
