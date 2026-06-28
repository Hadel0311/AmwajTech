export const api = {
  update: async () => 'updated',
  set: async () => {
    return await api.update();
  }
};

api.set().then(console.log).catch(console.error);
