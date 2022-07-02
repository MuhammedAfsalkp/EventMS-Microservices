import nats from 'node-nats-streaming';
const stan = nats.connect('test-cluster','12345',{url:'http://localhost:4222',waitOnFirstConnect:true});

stan.on('connect',()=>{
    console.log("publisher connected ")

    const data = JSON.stringify({
        id:'123',
        title:"47747"
    })
    stan.publish('ticket:created',data,()=>{console.log("Event published")})
})
stan.on('error',(err)=>{
    console.log("ERROR OCCUREED ",err)
})


// C:\Users\INFOSYS\Desktop\nats-streaming-server-v0.24.6-windows-amd64\nats-streaming-server.exe


// sc.exe create NewService binpath= c:\windows\system32\NewServ.exe type= share start= auto depend= +TDI NetBIOS

// sc.exe create nats-streaming-server binPath="\"<streaming server path>\nats-streaming-server.exe\" [NATS Streaming flags]"
// sc.exe start nats-streaming-server


// sc.exe create nss1 binPath="\"C:\Users\INFOSYS\Desktop\nats-streaming-server-v0.24.6-windows-amd64\nats-streaming-server.exe\" --syslog --syslog_name=nss1 -p 4222"

// sc.exe create nss2 binPath="\"c:\nats-io\nats-streaming\nats-streaming-server.exe\" --syslog --syslog_name=nss2 -p 4223"