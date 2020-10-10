# egret-use-signalR

SignalR for .Net Core 3.1

一、
    解压signalr_d.rar到egret根目录

二、
    tsconfig.json的include项里添加
    "signalr_d/*.d.ts"
    
三、
    egretProperties.json的modules项里添加
    {
      "name": "signalR",
      "path": "signalr_d"
    }
    
四、
    编写测试代码（在Main.ts中测试通过）
        
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://127.0.0.1:5000/chathub")
        .build();

    //绑定消息回调函数
    connection.on("StoCMessage", function (msg) {
        console.log("StoCMessage", msg.user, msg.message)
    });

    //开始连接
    connection.start().then(function () {
        //发送消息
        var user = "test";
        var message = "Hello world!!!";
        connection.invoke("CtoSMessage", { user, message }).catch(function (err) {
            return console.error(err.toString());
        });
    }).catch(function (err) {
        return console.error(err.toString());
    });
