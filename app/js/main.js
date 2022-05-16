/*@Author: A
 * @Date:   2022-01-06 10:51:39
 * @Last Modified by:   A
 * @Last Modified time: 2022-01-07 18:32:18
 */

// 敬请期待 弹窗
// dialog.alertMooinSoon();
$(document).on('click', '.btn-zil', function (event) {
    event.preventDefault();

    // sess_accounts = sessionStorage.getItem('user-accounts');

    // console.log(JSON.parse(sess_accounts));


    dialog.alertMooinSoon();
});



//alertMooinSoon
$(document).on('click', '.btn_green', function (event) {
    event.preventDefault();

    // sess_accounts = sessionStorage.getItem('user-accounts');

    // console.log(JSON.parse(sess_accounts));


    dialog.alertMetaMask();
});


$(document).on('click', '.btn-mmeta-mask', function (event) {
    event.preventDefault();
    /* Act on the event */
    let dataType = $('.icon_xy').attr('data-type');

    console.log(dataType)
    if (dataType == 1) {
        layer.msg('请先阅读并授权协议');
    } else {

        // 校验是否支持 Mate Mask
        // layer.msg('校验是否支持 Mate Mask');
        let browser = isBrowser();

        if (browser) {
            // 支持 检测是否安装
            // if (typeof window.ethereum !== 'undefined') {
            //     console.log('MetaMask 以安装!');
            //     dialog.closeDiv();

            //     ethereum.request({
            //         method: 'eth_requestAccounts'
            //     });
            // } else {
            //     console.log('MetaMask 未安装!');
            //     dialog.alertDownMetaMask();
            // }

            /// 支持 检测是否安装小狐狸
            const isMetaMaskInstalled = () => {
                //Have to check the ethereum binding on the window object to see if it's installed
                const {
                    ethereum
                } = window;
                return Boolean(ethereum && ethereum.isMetaMask);
            };

            if (isMetaMaskInstalled()) {
                console.log('MetaMask 以安装! 调用');
                dialog.closeDiv();

                onClickConnect();

            } else {
                console.log('MetaMask 未安装!');
                dialog.alertDownMetaMask();
            }

        } else {
            // 提示安装下载支持浏览器
            dialog.alertDownBrowser();
        }
    }
});



// const provider = new ethers.providers.Web3Provider(window.ethereum)
// console.log(provider)
// const signer = provider.getSigner();
// console.log(signer)

// 以安装 , 调用打开小狐狸
const onClickConnect = async () => {
    try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        await ethereum
            .request({
                method: 'eth_requestAccounts'
            })
            .then()
            .catch((err) => {
                if (err.code === 4001) {
                    // 用户拒绝连接
                    console.log('用户拒绝连接 MetaMask.');
                    layer.msg('用户拒绝连接 MetaMask.');
                } else {
                    console.error(err);
                }
            });

        const accounts = await ethereum.request({
            method: 'eth_accounts'
        });

        // 个人钱包地址 信息
        console.log(accounts[0]);

        sessionStorage.setItem('user-accounts', JSON.stringify(accounts[0]));


        if (accounts[0]) {


            if (ethereum.networkVersion != 56) {
                // layer.msg('不是bsc网络');

                dialog.alertBSC();

                // addNetwork();
            } else {
                // 发起签名
                dialog.closeDiv();
                console.log('发起签名');
                signTypedData(accounts[0])
            }
        }


    } catch (error) {
        console.error(error);
    }
};


// 不是bsc 网络
$(document).on('click', '.btn-open-bsc', function (event) {
    event.preventDefault();

    dialog.closeDiv();
    // 添加指定网络
    addNetwork();
});



// 返回当前主链id
console.log(ethereum.networkVersion)

// 账户状态改变了 - 用于校验链接状态
ethereum.on('accountsChanged', (accounts) => {
    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.

    console.log('1111')
});

// 连网络状态改变了
ethereum.on('chainChanged', (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    // window.location.reload();

    console.log(ethereum.networkVersion)
});


// 检测MetaMask 是否被用户解锁的
ethereum._metamask.isUnlocked();



// 跳转到指定 网络
/* const addNetwork = () => {
     window.ethereum.request({
             method: 'wallet_addEthereumChain', // Metamask的api名称
             params: [{
                 chainId: "0x80", // 网络id，16进制的字符串
                 chainName: "HecoMain", // 添加到钱包后显示的网络名称
                 rpcUrls: [
                     'https://http-mainnet-node.huobichain.com', // rpc地址
                 ],
                 iconUrls: [
                     '' // 网络的图标，暂时没看到在哪里会显示
                 ],
                 blockExplorerUrls: [
                     'https://hecoinfo.com' // 网络对应的区块浏览器
                 ],
                 nativeCurrency: { // 网络主币的信息
                     name: 'HT',
                     symbol: 'HT',
                     decimals: 18
                 }
             }]
         }).then()
         .catch((err) => {
             if (err.code === 4001) {
                 // 用户拒绝连接
                 console.log('用户拒绝连接 到指定网络');
             } else {
                 console.error(err);
             }
         });
 };
*/


const addNetwork = () => {
    window.ethereum.request({
        method: 'wallet_addEthereumChain', // Metamask的api名称
        params: [{
            chainId: "0x38", // 网络id，16进制的字符串
            chainName: "Binance Smart Chain Mainnet", // 添加到钱包后显示的网络名称
            rpcUrls: [
                // rpc地址
                "https://bsc-dataseed1.binance.org",
                "https://bsc-dataseed2.binance.org",
                "https://bsc-dataseed3.binance.org",
                "https://bsc-dataseed4.binance.org",
                "https://bsc-dataseed1.defibit.io",
                "https://bsc-dataseed2.defibit.io",
                "https://bsc-dataseed3.defibit.io",
                "https://bsc-dataseed4.defibit.io",
                "https://bsc-dataseed1.ninicoin.io",
                "https://bsc-dataseed2.ninicoin.io",
                "https://bsc-dataseed3.ninicoin.io",
                "https://bsc-dataseed4.ninicoin.io",
                "wss://bsc-ws-node.nariox.org"
            ],
            iconUrls: [
                '' // 网络的图标，暂时没看到在哪里会显示
            ],
            blockExplorerUrls: [
                'https://bscscan.com' // 网络对应的区块浏览器
            ],
            nativeCurrency: { // 网络主币的信息
                name: "Binance Chain Native Token",
                symbol: "BNB",
                decimals: 18
            }
        }]
    }).then((res) => {
        // 链接成功后发起 签名
        console.log(res);
        console.log(ethereum.networkVersion);
        console.log('发起签名----------------------------------');
        sess_accounts = sessionStorage.getItem('user-accounts');

        console.log(JSON.parse(sess_accounts));

        signTypedData(JSON.parse(sess_accounts))
    })
        .catch((err) => {
            if (err.code === 4001) {
                // 用户拒绝连接
                console.log('用户拒绝连接 到指定网络');
            } else {
                console.error(err);
            }
        });
};


async function signTypedData(from) {
    const msgParams = [{
        type: 'string',
        name: 'Message',
        value: 'Hi, Alice!',
    }, {
        type: 'uint32',
        name: 'A number',
        value: '1337',
    },];

    const sign = await ethereum.request({
        method: 'eth_signTypedData',
        params: [msgParams, from],
    });

    console.log(sign);


    layer.msg('获取到的签名信息, 跳转页面' + sign);

    $('.btn-zil').hide();

}

// signTypedData(accounts[0]);

/*{
    "name": "Binance Smart Chain Mainnet",
    "chain": "BSC",
    "rpc": [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org"
    ],
    "faucets": [
        "https://free-online-app.com/faucet-for-eth-evm-chains/"
    ],
    "nativeCurrency": {
        "name": "Binance Chain Native Token",
        "symbol": "BNB",
        "decimals": 18
    },
    "infoURL": "https://www.binance.org",
    "shortName": "bnb",
    "chainId": 56,
    "networkId": 56,
    "slip44": 714,
    "explorers": [
        {
            "name": "bscscan",
            "url": "https://bscscan.com",
            "standard": "EIP3091"
        }
    ]
}*/


// 下载 小狐狸按钮
$(document).on('click', '.btn-down-meta-mask', function (event) {
    dialog.closeDiv();
});


// 选中协议
$(document).on('click', '.icon_xy', function (event) {
    event.preventDefault();
    $('.icon_xy').toggleClass('ixon_xy_curr');

    if ($('.icon_xy').hasClass('ixon_xy_curr')) {
        $('.icon_xy').attr('data-type', '2');
    } else {
        $('.icon_xy').attr('data-type', '1');
    }
});

// 检测浏览器是否是 指定浏览器
function isBrowser() {

    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

    console.log(userAgent)

    //判断是否Firefox浏览器
    if (userAgent.indexOf("Firefox") > -1 || userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Brave") > -1 || userAgent.indexOf("Edge") > -1) {
        console.log(userAgent);
        return true;
        // return false;
    } else {
        return false;
    }
}