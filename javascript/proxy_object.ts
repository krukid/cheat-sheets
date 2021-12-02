const fakeLogger = {
	log(...args: string[]) {
		console.log('[fake logger]', ...args);
	},
};
const log = new Proxy<{ log: (...args: string[]) => void }>(fakeLogger, {
	get() {
		return fakeLogger.log;
	},
});
