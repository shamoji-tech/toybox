import { Divider, Grid, Typography, Paper, Box, Chip, TextField, Button } from '@material-ui/core';
import React, { Component } from 'react';


const FROM_SYSTEM = "@@chat/from/system";
const ME = "@@chat/from/me";
const TOS = "@@chat/from/tos";

class ChatMessage {
    constructor(message, from){
        this.message = message;
        this.from = from;
    }
}

class Contact extends Component {

    state = {
        comment: "" ,
        chat: [], 
        socket: null,
    }

    
    handleSendChat = (chatMessage) => {
        const tempChat = this.state.chat;
        tempChat.push(chatMessage);
        //ここで、チャットを送信するアクションを起こす。
        if(chatMessage.from === ME){
            this.state.socket.send(chatMessage.message);
        }
        this.setState((prevState)=>{
            return {
                ...prevState,
                chat: tempChat,
            };
        });
    }

    connectWebSocket = () => {
        const socket = new WebSocket("ws://localhost:9998");
        socket.onmessage = (event) => {
            this.setState((prevState)=>{
                const tempChat = this.state.chat;
                tempChat.push(new ChatMessage(event.data, TOS))
                return {
                    ...prevState,
                    chat: tempChat
                };
            });
        };
        this.setState((prevState)=>{
            return {
                ...prevState,
                socket: socket
            }
        });
        this.handleSendChat(new ChatMessage("Connected.",FROM_SYSTEM));
    }

    disconnectWebSocket = () => {
        this.state.socket.close();
        this.setState((prevState)=>{
            return {
                ...prevState,
                socket: null,
            };
        })
        this.handleSendChat(new ChatMessage("Disconnected. Bye.", FROM_SYSTEM))
    }

    render(){
        return (
            <div>
                <Grid container wrap="nowrap" style={{margin:"8px"}}>
                    <Typography variant="h4">Contact</Typography>
                </Grid>
                <Grid container wrap="nowrap" style={{margin:"8px", color:"#9c9c9c9c",}}>
                    <Typography variant="body1" >チャットサポート</Typography>
                </Grid>
                <Divider />
                <Grid container style={{margin:"8px"}} spacing={2}>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={this.connectWebSocket}>Connect</Button>
                    </Grid>
                    <Grid item>
                        <Button color="secondary" variant="contained" onClick={this.disconnectWebSocket}>Disconnect</Button>
                    </Grid>
                </Grid>
                <Divider />
                
                <Grid container>
                    <Grid item>
                        <TextField 
                        color="primary" 
                        label="Write here!" 
                        variant="outlined"
                        value={this.state.comment}
                        style={{width: "300px", margin:"8px",}}
                        onChange={(event)=>{
                            this.setState((prevState)=>{
                                return {
                                    ...prevState,
                                    comment: event.target.value
                                };
                            });
                        }}
                        onKeyPress={(e)=>{
                            if(e.shiftKey && e.key==="Enter"){
                                this.handleSendChat(new ChatMessage(this.state.comment, ME));
                                this.setState((prevState)=>{
                                    return {
                                        ...prevState,
                                        comment: "",
                                    };
                                });
                            }
                        }}
                        />
                    </Grid>
                    <Grid item>
                        <Button 
                        color="primary" 
                        variant="contained" 
                        style={{margin: "16px"}}
                        onClick={()=>{
                            this.handleSendChat(new ChatMessage(this.state.comment, ME));
                            this.setState((prevState)=>{
                                return {
                                    ...prevState,
                                    comment: "",
                                };
                            });
                        }}
                        >
                        Send
                        </Button>
                    </Grid>
                    <Grid item>
                    <Typography variant="body1" style={{margin: "16px", color:"#9c9c9c"}}>Shift+Enterで送信</Typography>
                    </Grid>
                </Grid>
                <Divider />

                <Paper style={{width: "400px", padding: "8px", margin: "8px",}}>
                    <Box overflow="auto" style={{width: "400px", height: "600px", padding: "16px"}}>
                        {this.state.chat.map((chatMessage,i)=>{
                            switch (chatMessage.from){
                                case FROM_SYSTEM:
                                    return (
                                        <Grid container justifyContent="center">
                                            <Chip label={chatMessage.message} style={{margin:"4px"}}/>
                                        </Grid>
                                    );
                                case ME:
                                    return (
                                        <Grid container justifyContent="flex-end">
                                            <Chip color="primary" label={chatMessage.message} style={{margin:"4px"}}/>
                                        </Grid>
                                    );
                                case TOS:
                                    return (
                                        <Grid container justifyContent="flex-start">
                                            <Chip label={chatMessage.message} style={{margin:"4px"}} />
                                        </Grid>
                                    );
                                default:
                                    return (
                                        <Grid container justifyContent="flex-end">
                                            <Chip color="primary" label={chatMessage.message} style={{margin: "4px"}}/>
                                        </Grid>
                                    );
                            }
                            
                        })}
                    </Box>
                </Paper>

                
            </div>
        );
    }
}

export default Contact;
