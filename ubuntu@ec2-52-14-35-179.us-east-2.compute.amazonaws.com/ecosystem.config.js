module.exports={
    app:[
        {
            name:"chat-server",
            script:"node dist/index.ts",
            env:{
                PORT:4000,
                CORS_ORIGIN:"http://18.188.60.166:3001",
                NODE_ENV:"production"
            }
        },
        {
            name:"bank-webhook",
            script:"node dist/index.js",
            env:{
                NODE_ENV:"production"
            }
        },
        {
            name:"user-app",
            script:"next start",
            env:{
                JWT_SECRET:"test123",
                NEXTAUTH_URL : "http://18.188.60.166:3001",
                SOCKET_SERVER_URL:"http://18.188.60.166:4000",
                NODE_ENV:"production"
            }
        }
    ]
}