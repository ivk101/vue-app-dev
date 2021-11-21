import eventBus from './../eventBus.js';

export default function gotoPage(pageName, pageParams) {
	eventBus.$emit('gotoPage', pageName, pageParams)
}