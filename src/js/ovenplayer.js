import OvenPlayerSDK, {checkAndGetContainerElement} from './ovenplayer.sdk'
import View from './view/view';
import {getScriptPath} from 'utils/webpack';

__webpack_public_path__ = getScriptPath('ovenplayer.js');

if (!__webpack_public_path__) {
    __webpack_public_path__ = window._ovenplayer_chunk_url_;
}

console.log(__webpack_public_path__)

function ovenPlayerFactory() {

    const OvenPlayer = {};

    Object.assign(OvenPlayer, OvenPlayerSDK);

    OvenPlayer.create = function (container, options) {
        let containerElement = checkAndGetContainerElement(container);

        let player = View(containerElement);

        if (!window.console || Object.keys(window.console).length === 0) {
            window.console = {
                log: function () {
                },
                info: function () {
                },
                error: function () {
                },
                warn: function () {
                }
            };
        }
        if (!window.OvenPlayerConsole || Object.keys(window.OvenPlayerConsole).length === 0) {
            window.OvenPlayerConsole = {};
            OvenPlayerConsole['log'] = function () {
            };
        }

        const playerInstance = OvenPlayerSDK.create(player.getMediaElementContainer(), options);
        if (options.debug) {
            playerInstance.log = window['console']['log'];
        }

        Object.assign(playerInstance, {
            getContainerId: function () {
                return containerElement.id;
            }
        });

        player.setApi(playerInstance);

        return playerInstance;
    };

    return OvenPlayer
}


export default ovenPlayerFactory()