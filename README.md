# tp-eosjs

Javascript SDK for TokenPocket EOS Dapp

* [Github](https://github.com/TP-Lab/tp-eosjs)

* [TokenPocket Website](https://www.mytokenpocket.vip/)

![TokenPocket](http://tokenpocket.gz.bcebos.com/TokenPocket-logo-h.png)


## Installation

```bash
npm install tp-eosjs
```

## Usage

请在TokenPocket中使用该SDK。
通过 APP中 关于我们->点击logo 8次开启 开发者模式，开启后可以在 发现-> Dapp Store 添加自定义URL

Open your site in TokenPocket as a Dapp.
In About Page, click the logo 8 times to open the develop mode. Then you can add your url in Dapp Store.

```javascript
var tp = require('tp-eosjs')
console.log(tp.isConnected());
```

### 1.EOS

EOS相关接口

#### 1.1 tp.eosTokenTransfer

eos代币转账

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
- `memo`: `String`- (optional)

##### Returns

`Object`:

- `result`: `Boolean`

- `data`: `String`- txhash

##### Example

```javascript
tp.eosTokenTransfer({
    from: 'abcabcabcabc',
    to: 'itokenpocket',
    amount: '0.0100',
    tokenName: 'EOS',
    precision: 4,
    contract: 'eosio.token',
    memo: 'test'
}).then(console.log)

> {
    result: true,
    data: '7a505551a56fb1bbd2619d9e323772ee9d9ed12c54a8e19c381c559c949fed23'
}
```



#### 1.2 tp.pushEosAction

执行Actions

```javascript
tp.pushEosAction(params)
```

##### Parameters

`params`- `Object`:
- `actions`: `Array`- Standard eos actions

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `String`- txhash
- `msg`: `String`

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
    ]
}).then(console.log)

> {
    result: true,
    data: '7a505551a56fb1bbd2619d9e323772ee9d9ed12c54a8e19c381c559c949fed23'
}
```


#### 1.3 tp.getEosBalance

获取EOS某个代币的余额

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
    tokenName: 'EOS'
}).then(console.log)

> {
    result: true,
    data:{"symbol":"EOS","balance":"["142.2648 EOS"]","contract":"eosio.token","account":"itokenpocket"},
    msg: 'success'
}
```

#### 1.4 tp.getTableRows

获取合约内table数据

```javascript
tp.getTableRows(params)
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
- `msg`: `String`

##### Example

```javascript
tp.getTableRows({
    json: true,
    code: 'abcabcabcabc',
    scope: 'abcabcabcabc',
    table: 'table1',
    lower_bound: '10',
    limit: 20
}).then(console.log)

> {
    result: true,
    data:{rows: [{a: 1, b: 'name' }, ...]},
    msg: 'success'
}
```


### 2.Common

通用接口

#### 2.1 tp.getAppInfo

获取APP的基本信息

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

#### 2.2 tp.getWalletList

获取对应底层的钱包列表

```javascript
tp.getWalletList(params)
```

##### Parameters

`params`- `String|Number`: `eth|1` for ETH, `jingtum|2` for Jingtum, `moac|3` for MOAC, `eos|4` for EOS

##### Returns

`Object`:
- `wallets`: `Object`
    - `eos|eth|moac|jingtum`: `Array` - Wallet info

##### Example

```javascript
tp.getWalletList('eos').then(console.log)

> {
    wallets: {
        'eos': [{
            name: 'abcabcabcabc',
            address: 'abcabcabcabc',
            tokens: {'eos': 1000},
            ...
        },
        ...
        ]
    }
}
```

#### 2.3 tp.getDeviceId

获取用户设备ID

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

#### 2.4 shareNewsToSNS

分享到社交媒体

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


#### 2.5 invokeQRScanner

调用扫码

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


