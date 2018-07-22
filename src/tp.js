let _ = require('lodash'); 

const TYPE_MAP = {
    eth: '1',
    jingtum: '2',
    moac: '3',
    eos: '4'
};

let _getTypeByStr = typeStr => {
    typeStr = _.trim(typeStr).toLowerCase();
    return TYPE_MAP[typeStr] || typeStr;
}

let _getCallbackName = () => {
    return 'tp_callback_' + (new Date).getTime();
}

let tp = {
    version: '1.0.0',
    isConnected: () => {
        return !!(window.TPJSBrigeClient || window.webkit);
    },
    eosTokenTransfer: params => {
        // 必填项
        if (!params.from || !params.to || !params.amount || !params.tokenName || !params.contract || !params.precision) {
            throw new Error('missing params; "from", "to", "amount", "tokenName","contract", "precision" is required ');
        }

        return new Promise((resolve, reject) => {
            let tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = result => {

                try {
                    let res = JSON.parse(result);
                    resolve(res);
                }

                catch (e) {
                    reject(e);
                }
            }
            // android
            if (window.TPJSBrigeClient) {
                window.TPJSBrigeClient.callMessage('eosTokenTransfer', JSON.stringify(params), tpCallbackFun);
            }
            // ios
            if (window.webkit) {
                window.webkit.messageHandlers.eosTokenTransfer.postMessage({body:{'params': JSON.stringify(params), 'callback':tpCallbackFun}});
            }
            
        })
    },
    pushEosAction: params => {
        return new Promise((resolve, reject) => {
            let tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = result => {

                try {
                    let res = JSON.parse(result);
                    resolve(res);
                }

                catch (e) {
                    reject(e);
                }
            }
            // android
            if (window.TPJSBrigeClient) {
                window.TPJSBrigeClient.callMessage('pushEosAction', JSON.stringify(params), tpCallbackFun);
            }
            // iOS
            else if (window.webkit) {
                window.webkit.messageHandlers.pushEosAction.postMessage({body:{'params': JSON.stringify(params), 'callback': tpCallbackFun}});
            }
        });
    },
    getAppInfo: () => {
        return new Promise((resolve, reject) => {
            let tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = result => {

                try {
                    let res = JSON.parse(result);
                    resolve(res);
                }

                catch (e) {
                    reject(e);
                }
            }
            // android
            if (window.TPJSBrigeClient) {
                window.TPJSBrigeClient.callMessage('getAppInfo', '', tpCallbackFun);
            }
            // iOS
            else if (window.webkit) {
                window.webkit.messageHandlers.getAppInfo.postMessage({body:{'params': '', 'callback': tpCallbackFun}});
            }
        });
    },
    getEosBalance: params => {

        if (!params.account || !params.contract || !params.symbol) {
            throw new Error('missing params; "account", "contract", "symbol" is required ');
        }

        return new Promise((resolve, reject) => {
            let tpCallbackFun = _getCallbackName();
       
            window[tpCallbackFun] =  result => {

                try {
                    let res = JSON.parse(result);
                    resolve(res);
                }
                catch(e) {
                    reject(e);
                }
            }
             // android
            if (window.TPJSBrigeClient) {
                window.TPJSBrigeClient.callMessage('getEosBalance', JSON.stringify(params), tpCallbackFun);
            }
            // ios
            if (window.webkit) {
                window.webkit.messageHandlers.getEosBalance.postMessage({body:{'params': JSON.stringify(params), 'callback':tpCallbackFun}});
            }
        });


    },
    getEosAccountInfo: params => {

        if (!params.account) {
            throw new Error('missing params; "account" is required ');
        }

        return new Promise((resolve, reject) => {
            let tpCallbackFun = _getCallbackName();
       
            window[tpCallbackFun] =  result => {

                try {
                    let res = JSON.parse(result);
                    resolve(res);
                }
                catch(e) {
                    reject(e);
                }
            }
             // android
            if (window.TPJSBrigeClient) {
                window.TPJSBrigeClient.callMessage('getEosAccountInfo', JSON.stringify(params), tpCallbackFun);
            }
            // ios
            if (window.webkit) {
                window.webkit.messageHandlers.getEosAccountInfo.postMessage({body:{'params': JSON.stringify(params), 'callback':tpCallbackFun}});
            }
        });
    },
    getDeviceId: () => {
        return new Promise((resolve, reject) => {
            let tpCallbackFun = _getCallbackName();
       
            window[tpCallbackFun] =  result => {

                try {
                    let res = JSON.parse(result);
                    if (res.device_id) {
                        res.data = res.device_id;
                    }
                    resolve(res);
                }
                catch(e) {
                    reject(e);
                }
            }
             // android
            if (window.TPJSBrigeClient) {
                window.TPJSBrigeClient.callMessage('getDeviceId', '', tpCallbackFun);
            }
            // ios
            if (window.webkit) {
                window.webkit.messageHandlers.getDeviceId.postMessage({body:{'params': '', 'callback':tpCallbackFun}});
            }
        });
        
    },
    getWalletList: type => {
        type = _getTypeByStr(type);

        if (!type) {
            throw new Error('type invalid');
        }

        let params = {type};
        
        return new Promise((resolve, reject) => {
            let tpCallbackFun = _getCallbackName();
       
            window[tpCallbackFun] = result => {

                try {
                    
                    let res = JSON.parse(result);
                    resolve(res);
                }
                catch(e) {
                    reject(e);
                }
            }

             // android
            if (window.TPJSBrigeClient) {
                window.TPJSBrigeClient.callMessage('getWalletList', JSON.stringify(params), tpCallbackFun);
            }
            // ios
            if (window.webkit) {
                window.webkit.messageHandlers.getWalletList.postMessage({body:{'params': JSON.stringify(params), 'callback':tpCallbackFun}})
            }
        });

       
    },
    invokeQRScanner: () => {
        return new Promise((resolve, reject) => {
            let tpCallbackFun = _getCallbackName();
       
            window[tpCallbackFun] =  result => {

                try {
                    let res = JSON.parse(result);
                    let data = res.qrResult || '';
                    resolve(data);
                }
                catch(e) {
                    reject(e);
                }
            }
             // android
            if (window.TPJSBrigeClient) {
                window.TPJSBrigeClient.callMessage('invokeQRScanner', '', tpCallbackFun);
            }
            // ios
            if (window.webkit) {
                window.webkit.messageHandlers.invokeQRScanner.postMessage({body:{'params': '', 'callback': tpCallbackFun}});
            }
        });
    },
    shareNewsToSNS: params => {
        
        let title = params.title || 'TokenPocket 你的通用数字钱包';
        let description = params.desc || ''; 
        let url = params.url || 'https://www.mytokenpocket.vip/';
        let previewImage = params.previewImage || '';


        let data = {title, description, url, previewImage};

        if (window.webkit) {
            window.webkit.messageHandlers.shareNewsToSNS.postMessage({body:{'params': JSON.stringify(data), 'callback':''}});
        }
        if (window.TPJSBrigeClient) {
            window.TPJSBrigeClient.callMessage('shareNewsToSNS', JSON.stringify(data), '');
        }
    }
};


module.exports = tp;