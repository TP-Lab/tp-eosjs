# tp-eosjs

* TokenPocket 已经兼容 Scatter，直接在钱包内 Dapp浏览器 内输入URL即可使用。（本项目只支持移动端TokenPocket）
* TokenPocket is already compatible with Scatter. You can input your URL in the Dapp browser inside the TP Wallet. (mobile only)

* 在这里查看TokenPocket支持的其他区块链底层 JS API: 
* Check other blockchain js api here:

* [https://github.com/TP-Lab/tp-js-sdk](https://github.com/TP-Lab/tp-js-sdk)



Javascript SDK for TokenPocket EOS Dapp

* [Github](https://github.com/TP-Lab/tp-eosjs)

* [TokenPocket Website](https://www.mytokenpocket.vip/)

* [提交你的DApp (Submit your DApp)](http://tokenpocket.mikecrm.com/v5QSKjj)

![TokenPocket](http://tokenpocket.gz.bcebos.com/TokenPocket-logo-h-300.png)


* We also have an [Android&iOS SDK](https://github.com/TP-Lab/Mobile-SDK)

## <a name='Usage'></a>Usage

请在TokenPocket中使用该SDK。
请在发现 -> DApp浏览器中 开发调试

Open your site in TokenPocket as a Dapp.
Develope and test in Discover -> DappBrowser.

Npm
```javascript
var tp = require('tp-eosjs')
console.log(tp.isConnected());
```

Browser
```html
<script src="./dist/tp.js"></script>
<script>
    console.log(tp.isConnected());
</script>
```


<!-- vscode-markdown-toc -->
* [Usage](#Usage)
	* [1.EOS](#EOS)
		* [1.1 tp.eosTokenTransfer](#tp.eosTokenTransfer)
		* [1.2 tp.pushEosAction](#tp.pushEosAction)
		* [1.3 tp.getEosBalance](#tp.getEosBalance)
		* [1.4 tp.getEosTableRows](#tp.getEosTableRows)
		* [1.5 tp.getEosAccountInfo](#tp.getEosAccountInfo)
		* [1.6 tp.getEosTransactionRecord](#tp.getEosTransactionRecord)
		* [1.7 tp.eosAuthSign](#tp.eosAuthSign)
	* [2. COMMON](#COMMON)
		* [2.1 tp.getAppInfo](#tp.getAppInfo)
		* [2.2 tp.getWalletList (Deprecated)](#tp.getWalletListDeprecated)
		* [2.3 tp.getDeviceId](#tp.getDeviceId)
		* [2.4 tp.shareNewsToSNS](#tp.shareNewsToSNS)
		* [2.5 tp.invokeQRScanner](#tp.invokeQRScanner)
		* [2.6 tp.getCurrentWallet  (Recommended)](#tp.getCurrentWalletRecommended)
		* [2.7 tp.getWallets  (Deprecated)](#tp.getWalletsDeprecated)
		* [2.8 tp.sign](#tp.sign)
		* [2.9 tp.back](#tp.back)
		* [2.10 tp.close](#tp.close)
		* [2.11 tp.fullScreen](#tp.fullScreen)
		* [2.12 tp.importWallet](#tp.importWallet)
		* [2.13 tp.setMenubar](#tp.setMenubar)
		* [2.14 tp.startChat](#tp.startChat)
		* [2.15 tp.saveImage](#tp.saveImage)
		* [2.16 tp.rollHorizontal](#tp.rollHorizontal)
		* [2.17 tp.popGestureRecognizerEnable](#tp.popGestureRecognizerEnable)
	* [3 EOS sidechain](#EOSsidechain)
		* [3.1 tp.tokenTransfer](#tp.tokenTransfer)
		* [3.2 tp.pushAction](#tp.pushAction)
		* [3.3 tp.getBalance](#tp.getBalance)
		* [3.4 tp.getTableRows](#tp.getTableRows)
		* [3.5 tp.getAccountInfo](#tp.getAccountInfo)
		* [3.6 tp.getTransactionRecord](#tp.getTransactionRecord)
		* [3.7 tp.authSign](#tp.authSign)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->


### <a name='EOS'></a>1.EOS

#### <a name='tp.eosTokenTransfer'></a>1.1 tp.eosTokenTransfer

```javascript
tp.eosTokenTransfer(params)
```

##### Parameters

`params`- `Object`:
- `from`: `String`
- `to`: `String`
- `amount`: `String|Number`
- `tokenName`: `String`
- `precision`: `Number|String`
- `contract`: `String`
- `memo`: `String`- (optional),
- `address`: `String` - public key for current account

##### Returns

`Object`:

- `result`: `Boolean`

- `data`: `Object`
    - `transactionId` : `Stirng`

##### Example

```javascript
tp.eosTokenTransfer({
    from: 'abcabcabcabc',
    to: 'itokenpocket',
    amount: '0.0100',
    tokenName: 'EOS',
    precision: 4,
    contract: 'eosio.token',
    memo: 'test',
    address: 'EOS7ds9A9FGDsKrdymQ4ynKbMgbCVaaaaaaaaaaa'
}).then(console.log)

> {
    result: true,
    data: {transactionId: 'b428357c7xxxxxxxxxxxxxx'}
}
```



#### <a name='tp.pushEosAction'></a>1.2 tp.pushEosAction

```javascript
tp.pushEosAction(params)
```

##### Parameters

`params`- `Object`:
- `actions`: `Array`- Standard eos actions
- `account`: `String` - current account
- `address`: `String` - public key for current account

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `transactionId` : `Stirng`

##### Example

```javascript
tp.pushEosAction({
    actions: [
        {
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: 'aaaabbbbcccc',
                permission: 'active'
            }],
            data: {
                from: 'aaaabbbbcccc',
                to: 'itokenpocket',
                quantity: '1.3000 EOS',
                memo: 'something to say'
            }
         },
         {
            account: "eosio",
            name: "delegatebw",
            authorization: [
                {
                actor: 'aaaabbbbcccc',
                permission: "active"
                }
            ],
            data: {
                from: 'aaaabbbbcccc',
                receiver: 'itokenpocket',
                stake_net_quantity: "0.0100 EOS",
                stake_cpu_quantity: "0.0100 EOS",
                transfer: 0
            }
        }
    ],
    address: 'EOS7ds9A9FGDsKrdymQ4ynKbMgbCVaaaaaaaaaaa',
    account: 'aaaabbbbcccc'
}).then(console.log)

> {
    result: true,
    data: {transactionId: 'b428357c7xxxxxxxxxxxxxx'}
}
```


#### <a name='tp.getEosBalance'></a>1.3 tp.getEosBalance

```javascript
tp.getEosBalance(params)
```

##### Parameters

`params`- `Object`:
- `account`: `String`
- `contract`: `String`
- `symbol`: `String`

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `symbol`: `String`
    - `balance`: `String`
    - `contract`: `String`
    - `account`: `String`
- `msg`: `String`

##### Example

```javascript
tp.getEosBalance({
    account: 'itokenpocket',
    contract: 'eosio.token',
    symbol: 'EOS'
}).then(console.log)

> {
    result: true,
    data:{"symbol":"EOS","balance":"["142.2648 EOS"]","contract":"eosio.token","account":"itokenpocket"},
    msg: 'success'
}
```


#### <a name='tp.getEosTableRows'></a>1.4 tp.getEosTableRows

获取合约内table数据

```javascript
tp.getEosTableRows(params)
```

##### Parameters

`params`- `Object`:

- `json`: `Boolean`
- `code`: `String`
- `scope`: `String`
- `table`: `String`
- `table_key`: `Stirng`
- `lower_bound`: `String`
- `upper_bound`: `String`
- `limit`: `Number`


##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `rows`: `Array`
    - `more`: `boolean`
- `msg`: `String`

##### Example

```javascript
tp.getEosTableRows({
    json: true,
    code: 'abcabcabcabc',
    scope: 'abcabcabcabc',
    table: 'table1',
    lower_bound: '10',
    limit: 20
}).then(console.log)

> {
    result: true,
    data:{
        rows: [{a: 1, b: 'name' }, ...], 
        more: true
    },
    msg: 'success'
}
```

#### <a name='tp.getEosAccountInfo'></a>1.5 tp.getEosAccountInfo
```javascript
tp.getEosAccountInfo(params)
```

##### Parameters

`params`- `Object`:
- `account`: `String`

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`- Standard account object
- `msg`: `String`

##### Example

```javascript
tp.getEosAccountInfo({
    account: 'itokenpocket'
}).then(console.log)

> {
    result: true,
    data:{"account_name":"itokenpocket",..., "is_proxy":0}},
    msg: 'success'
}
```

#### <a name='tp.getEosTransactionRecord'></a>1.6 tp.getEosTransactionRecord

```javascript
tp.getEosTransactionRecord(params)
```

##### Parameters

`params`- `Object`:
- `account`: `String`
- `start`: `Number` - default: 0
- `count`: `Number` - default: 10
- `sort`: `String` - 'desc | asc'  default: desc
- `token`: `String` - optional
- `contract`: `String` - optional

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`- Standard account object
- `msg`: `String`

##### Example

```javascript
tp.getEosTransactionRecord({
    start: 10,
    count: 20,
    account: 'itokenpocket',
    token: 'EOS',
    sort: 'desc',
    contract: 'eosio.token'
}).then(console.log)

> {
    result: true,
    data: [{
        "title": "",
        "comment": "",
        "hid": "4bd63a191a1e3e00f13fe6df55d0c08803800a5e7cd0d0b15c92d52b3c42285e",
        "producer": "bp4",
        "timestamp": 1531578890,
        "action_index": 2,
        "account": "eosio",
        "name": "delegatebw",
        "from": "tokenpocket1",
        "to": "clementtes43",
        "blockNum": 4390980,
        "quantity": "0.2000000000 EOS",
        "count": "0.2000000000",
        "symbol": "EOS",
        "memo": "",
        "maximum_upply": "",
        "ram_price": "",
        "bytes": "",
        "status": 1,
        "data": ""，
        real_value:"0.2000000000"
        }, ...],
    msg: 'success'
}
```


#### <a name='tp.eosAuthSign'></a>1.7 tp.eosAuthSign

```javascript
tp.eosAuthSign(params)
```

##### Parameters

`params`- `Object`:
- `from`: `String` - eos account name
- `publicKey`: `String` 
- `signdata`: `String`


##### Returns
- Verify the `timestamp+wallet+signdata+ref` string.
- 按照 timestamp+wallet+signdata+ref的顺序拼接字符串校验签名

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `signature` : `String`
    - `ref`: `String` - 'TokenPocket'
    - `signdata` : `String`
    - `timestamp`: `String`
    - `wallet` : `String` - eos account name
- `msg`: `String`

##### Example

```javascript
tp.eosAuthSign({
    from: 'itokenpocket',
    publicKey: 'EOS13we3sbereewwwwww',
    signdata: 'something to sign'
}).then(console.log)

> {
    result: true,
    data: {
        signature: 'SIG_EBEFWA-AFEBEf-eeee-aaaaa-eeeeea23d',
        timestamp: '1534735280',
        ref: 'TokenPocket',
        signdata: 'something to sign',
        wallet: 'itokenpocket'
    },
    msg: 'success'
}
```







### <a name='COMMON'></a>2. COMMON

#### <a name='tp.getAppInfo'></a>2.1 tp.getAppInfo

```javascript
tp.getAppInfo()
```

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `name`: `String`
    - `system`: `String`
    - `version`: `String`
    - `sys_version`: `String`
- `msg`: `String`

##### Example

```javascript
tp.getAppInfo().then(console.log)

> {
    result: true,
    data: {
        name: 'TokenPocket',
        system: 'android',
        version: '0.3.4',
        sys_version: '26'
    },
    msg: 'success'
}
```

#### <a name='tp.getWalletListDeprecated'></a>2.2 tp.getWalletList (Deprecated)

```javascript
tp.getWalletList(params)
```

##### Parameters

`params`- `String|Number` - `eth|1` for ETH, `jingtum|2` for Jingtum, `moac|3` for MOAC, `eos|4` for EOS , `enu|5` for ENU

##### Returns

`Object`:
- `wallets`: `Object`
    - `eos|eth|moac|jingtum`: `Array` - Wallet info

##### Example

```javascript
tp.getWalletList('eth').then(console.log)

> {
    wallets: {
        'eth': [{
            name: 'pk-1',
            address: '0xaaaaaaa',
            tokens: {'eth': 1000},
            ...
        },
        ...
        ]
    }
}
```

#### <a name='tp.getDeviceId'></a>2.3 tp.getDeviceId

```javascript
tp.getDeviceId()
```

##### Returns

`Object`:
- `device_id`: `String`

##### Example

```javascript
tp.getDeviceId().then(console.log)

> {
    device_id: 'dexa23333'
}
```

#### <a name='tp.shareNewsToSNS'></a>2.4 tp.shareNewsToSNS

分享
share to SNS

```javascript
tp.shareNewsToSNS(params)
```

##### Parameters

`params`- `Object`:
- `title`: `String`
- `desc`: `String`
- `url`: `String`
- `previewImage`: `String`

##### Example

```javascript
tp.shareNewsToSNS({
    title: 'TokenPocket',
    desc: 'Your Universal Wallet',
    url: 'https://www.mytokenpocket.vip/',
    previewImage: 'https://www.mytokenpocket.vip/images/index/logo.png'
})

```


#### <a name='tp.invokeQRScanner'></a>2.5 tp.invokeQRScanner

扫码
Scan the QRcode

```javascript
tp.invokeQRScanner()
```

##### Returns

`String`

##### Example

```javascript
tp.invokeQRScanner().then(console.log)

> "abcdefg"
```

#### <a name='tp.getCurrentWalletRecommended'></a>2.6 tp.getCurrentWallet  (Recommended)

获取用户当前钱包

`1` for ETH, `2` for Jingtum, `3` for MOAC, `4` for EOS , `5` for ENU, `6` for BOS, `7` for IOST , `8` for COSMOS , `9`for binance `10` for TRON

```javascript
tp.getCurrentWallet()
```

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `name`: `String`
    - `address`: `String`
    - `blockchain_id`: `Number`
    - `permissions`: `Array`
- `msg`: `String`

##### Example

```javascript
tp.getCurrentWallet().then(console.log)

> {
    result: true,
    data: {
        name: 'itokenpocket',
        address: 'EOSaaaaaaaaabbbbbbbb',
        blockchain_id: 4,
        permissions: ['active']
    },
    msg: 'success'
}
```


#### <a name='tp.getWalletsDeprecated'></a>2.7 tp.getWallets  (Deprecated)

获取用户钱包列表
Get user's wallet list

`1` for ETH, `2` for Jingtum, `3` for MOAC, `4` for EOS , `5` for ENU

```javascript
tp.getWallets()
```

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Array`
    - `address`: `String`
    - `name`: `String`
    - `blockchain_id`: `Number`
- `msg`: `String`

##### Example

```javascript
tp.getWallets().then(console.log)

> {
    result: true,
    data: [
        {
            name: 'itokenpocket',
            address: 'EOSaaaaaaaaabbbbbbbb',
            blockchain_id: 4
        },
        {
            name: 'ethwallet11',
            address: '0x40e5A542087FA4b966209707177b103d158Fd3A4',
            blockchain_id: 1
        }
    ],
    msg: 'success'
}
```

#### <a name='tp.sign'></a>2.8 tp.sign

```javascript
tp.sign(params)
```

##### Parameters

`params`- `Object`:
- `appid`: `String`


##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `deviceId` : `Stirng`
    - `appid` : `String`
    - `timestamp` : `Number`
    - `sign` : `String`
- `msg`: `String`

##### Example

```javascript
tp.sign({
    appid: 'swEmwEQ666'
}).then(console.log)

> {
    result: true,
    data: {
        deviceId: 'EBEFWA-AFEBEf-eeee-aaaaa-eeeeea23d',
        appid: 'swEmwEQ666',
        timestamp: 1534735280,
        sign: '713efewwfegwohvnqooyge38h4n421ll3fwzib9e3q00'
    },
    msg: 'success'
}
```


#### <a name='tp.back'></a>2.9 tp.back

页面后退一页
back forward

```javascript
tp.back()
```

##### Example

```javascript
tp.back()

```

#### <a name='tp.close'></a>2.10 tp.close

关闭当前Dapp页面
close the dapp

```javascript
tp.close()
```

##### Example

```javascript
tp.close()

```


#### <a name='tp.fullScreen'></a>2.11 tp.fullScreen

全屏应用
fullScreen the dapp

```javascript
tp.fullScreen(params)
```

##### Parameters

`params`- `Object`:
- `fullScreen`: `Number` 1 - fullScreen,  0 - cancel


##### Example

```javascript
tp.fullScreen({
    fullScreen: 0
})
```


#### <a name='tp.importWallet'></a>2.12 tp.importWallet

钱包导入界面 

Invoke the wallet importing window

```javascript
tp.importWallet(blockchain)
```

##### Parameters

`blockchain`- `String`: 'eos' | 'eth' | 'enu' | 'moac'


##### Example

```javascript
tp.importWallet('eos');
```


#### <a name='tp.setMenubar'></a>2.13 tp.setMenubar

全屏时 设置dapp浏览器导航条可见性

When the `fullscreen` is on, set the dapp browser's navbar visiblity

```javascript
tp.setMenubar(params)
```

##### Parameters

`params`- `Object`:
- `flag`: `Number` 1 - open,  0 - close(default)



##### Example

```javascript
tp.setMenubar({
    flag: 1
});
```


#### <a name='tp.startChat'></a>2.14 tp.startChat

跳到TP聊天

Open TP IM

```javascript
tp.startChat(params)
```

##### Parameters

`params`- `Object`:

- `sessionType`: `Number` 私聊是0  群聊是1
- `account`: `String` 私聊是目标用户的账号(eos,iost等)或地址(eth,moac等)， 群聊是群的id
- `blockChainId`: `Number` 只有私聊需要填， 私聊时目标用户的底层 1 for ETH, 2 for Jingtum, 3 MOAC, 4 for EOS , 5 for ENU, 6 for BOS, 7 for IOST

##### Example

```javascript
tp.startChat({
    account: 'itokenpocket', 
    sessionType: 0,
    blockChainId: 4
});
```


#### <a name='tp.saveImage'></a>2.15 tp.saveImage

保存图片

Save image

```javascript
tp.saveImage(params)
```

##### Parameters

`params`- `Object`:
- `url`: `String` image's url


##### Example

```javascript
tp.saveImage({
    url: 'https://dapp.mytokenpocket.vip/tokenpocket_logo.png'
});


```
#### <a name='tp.rollHorizontal'></a>2.16 tp.rollHorizontal

横屏

rotate the screen horizontal

```javascript
tp.rollHorizontal(params)
```

##### Parameters

`params`- `Object`:
- `horizontal`: `Boolean`



##### Example

```javascript
tp.rollHorizontal({
    horizontal: true
});
```


#### <a name='tp.popGestureRecognizerEnable'></a>2.17 tp.popGestureRecognizerEnable

禁止iOS自带的左滑手势返回，对安卓无影响

Disable iOS's left-sliding gesture to return. There is no effect on Android

```javascript
tp.popGestureRecognizerEnable(params)
```

##### Parameters

`params`- `Object`:
- `enable`: `Boolean` - default: `true`



##### Example

```javascript
tp.popGestureRecognizerEnable({
    enable: false
});
```

#### 2.18 tp.forwardNavigationGesturesEnable

禁止webview自带的左滑手势触发goback, 对安卓无影响

Disable the left sliding gesture by WebView to trigger goback. There is no effect on Android

```javascript
tp.forwardNavigationGesturesEnable(params)
```

##### Parameters

`params`- `Object`:
- `enable`: `Boolean` - default: `true`



##### Example

```javascript
tp.forwardNavigationGesturesEnable({
    enable: false
});
```



### <a name='EOSsidechain'></a>3 EOS sidechain


#### <a name='tp.tokenTransfer'></a>3.1 tp.tokenTransfer

```javascript
tp.tokenTransfer(params)
```

##### Parameters

`params`- `Object`:
- `blockchain`: `String` - 'eos' | 'bos'
- `from`: `String`
- `to`: `String`
- `amount`: `String|Number`
- `tokenName`: `String`
- `precision`: `Number|String`
- `contract`: `String`
- `memo`: `String`- (optional),
- `address`: `String` - public key for current account

##### Returns

`Object`:

- `result`: `Boolean`

- `data`: `Object`
    - `transactionId` : `Stirng`

##### Example

```javascript
tp.tokenTransfer({
    blockchain: 'eos',
    from: 'abcabcabcabc',
    to: 'itokenpocket',
    amount: '0.0100',
    tokenName: 'EOS',
    precision: 4,
    contract: 'eosio.token',
    memo: 'test',
    address: 'EOS7ds9A9FGDsKrdymQ4ynKbMgbCVaaaaaaaaaaa'
}).then(console.log)

> {
    result: true,
    data: {transactionId: 'b428357c7xxxxxxxxxxxxxx'}
}
```



#### <a name='tp.pushAction'></a>3.2 tp.pushAction

```javascript
tp.pushAction(params)
```

##### Parameters

`params`- `Object`:
- `blockchain`: `String` - 'eos' | 'bos'
- `actions`: `Array`- Standard eos actions
- `account`: `String` - current account
- `address`: `String` - public key for current account

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `transactionId` : `Stirng`

##### Example

```javascript
tp.pushAction({
    blockchain: 'eos',
    actions: [
        {
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: 'aaaabbbbcccc',
                permission: 'active'
            }],
            data: {
                from: 'aaaabbbbcccc',
                to: 'itokenpocket',
                quantity: '1.3000 EOS',
                memo: 'something to say'
            }
         },
         {
            account: "eosio",
            name: "delegatebw",
            authorization: [
                {
                actor: 'aaaabbbbcccc',
                permission: "active"
                }
            ],
            data: {
                from: 'aaaabbbbcccc',
                receiver: 'itokenpocket',
                stake_net_quantity: "0.0100 EOS",
                stake_cpu_quantity: "0.0100 EOS",
                transfer: 0
            }
        }
    ],
    address: 'EOS7ds9A9FGDsKrdymQ4ynKbMgbCVaaaaaaaaaaa',
    account: 'aaaabbbbcccc'
}).then(console.log)

> {
    result: true,
    data: {transactionId: 'b428357c7xxxxxxxxxxxxxx'}
}
```


#### <a name='tp.getBalance'></a>3.3 tp.getBalance

```javascript
tp.getBalance(params)
```

##### Parameters

`params`- `Object`
- `blockchain`: `String` - 'eos' | 'bos'
- `account`: `String`
- `contract`: `String`
- `symbol`: `String`

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `symbol`: `String`
    - `balance`: `String`
    - `contract`: `String`
    - `account`: `String`
- `msg`: `String`

##### Example

```javascript
tp.getBalance({
    blockchain: 'eos',
    account: 'itokenpocket',
    contract: 'eosio.token',
    symbol: 'EOS'
}).then(console.log)

> {
    result: true,
    data:{"symbol":"EOS","balance":"["142.2648 EOS"]","contract":"eosio.token","account":"itokenpocket"},
    msg: 'success'
}
```

#### <a name='tp.getTableRows'></a>3.4 tp.getTableRows 

获取合约内table数据

```javascript
tp.getTableRows(params)
```

##### Parameters

`params`- `Object`:
- `blockchain`: `String`  - 'eos' | 'bos'
- `json`: `Boolean`
- `code`: `String`
- `scope`: `String`
- `table`: `String`
- `table_key`: `Stirng`
- `lower_bound`: `String`
- `upper_bound`: `String`
- `limit`: `Number`


##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `rows`: `Array`
    - `more`: `boolean`
- `msg`: `String`

##### Example

```javascript
tp.getTableRows({
    blockchain: 'eos',
    json: true,
    code: 'abcabcabcabc',
    scope: 'abcabcabcabc',
    table: 'table1',
    lower_bound: '10',
    limit: 20
}).then(console.log)

> {
    result: true,
    data:{
        rows: [{a: 1, b: 'name' }, ...], 
        more: true
    },
    msg: 'success'
}
```

#### <a name='tp.getAccountInfo'></a>3.5 tp.getAccountInfo
```javascript
tp.getAccountInfo(params)
```

##### Parameters

`params`- `Object`:
- `account`: `String`
- `blockchain`: `String`  - 'eos' | 'bos'

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`- Standard account object
- `msg`: `String`

##### Example

```javascript
tp.getEosAccountInfo({
    account: 'itokenpocket',
    blockchain: 'eos'
}).then(console.log)

> {
    result: true,
    data:{"account_name":"itokenpocket",..., "is_proxy":0}},
    msg: 'success'
}
```

#### <a name='tp.getTransactionRecord'></a>3.6 tp.getTransactionRecord

```javascript
tp.getTransactionRecord(params)
```

##### Parameters

`params`- `Object`:
- `blockchain`: `String` - 'eos' | 'bos'
- `account`: `String`
- `start`: `Number` - default: 0
- `count`: `Number` - default: 10
- `sort`: `String` - 'desc | asc'  default: desc
- `token`: `String` - optional
- `contract`: `String` - optional

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`- Standard account object
- `msg`: `String`

##### Example

```javascript
tp.getEosTransactionRecord({
    blockchain: 'eos',
    start: 10,
    count: 20,
    account: 'itokenpocket',
    token: 'EOS',
    sort: 'desc',
    contract: 'eosio.token'
}).then(console.log)

> {
    result: true,
    data: [{
        "title": "",
        "comment": "",
        "hid": "4bd63a191a1e3e00f13fe6df55d0c08803800a5e7cd0d0b15c92d52b3c42285e",
        "producer": "bp4",
        "timestamp": 1531578890,
        "action_index": 2,
        "account": "eosio",
        "name": "delegatebw",
        "from": "tokenpocket1",
        "to": "clementtes43",
        "blockNum": 4390980,
        "quantity": "0.2000000000 EOS",
        "count": "0.2000000000",
        "symbol": "EOS",
        "memo": "",
        "maximum_upply": "",
        "ram_price": "",
        "bytes": "",
        "status": 1,
        "data": ""，
        real_value:"0.2000000000"
        }, ...],
    msg: 'success'
}
```


#### <a name='tp.authSign'></a>3.7 tp.authSign

```javascript
tp.authSign(params)
```

##### Parameters

`params`- `Object`:
- `blockchain`: `String` - 'eos' | 'bos'
- `from`: `String` -  account name
- `publicKey`: `String` 
- `signdata`: `String`


##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `signature` : `String`
    - `ref`: `String` - 'TokenPocket'
    - `signdata` : `String`
    - `timestamp`: `String`
    - `wallet` : `String` - eos account name
- `msg`: `String`

##### Example

```javascript
tp.authSign({
    blockchain: 'bos',
    from: 'itokenpocket',
    publicKey: 'EOS13we3sbereewwwwww',
    signdata: 'something to sign'
}).then(console.log)

> {
    result: true,
    data: {
        signature: 'SIG_EBEFWA-AFEBEf-eeee-aaaaa-eeeeea23d',
        timestamp: '1534735280',
        ref: 'TokenPocket',
        signdata: 'something to sign',
        wallet: 'itokenpocket'
    },
    msg: 'success'
}
```
