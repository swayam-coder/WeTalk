import React from 'react'
import Messages from "./Message";
import { useMessageSub, useMsgMutation, useStatusQuery, useStatusSub } from '../hooks/uqrl';
import * as urql from "../util/urql";
import { User } from "../util/interfaces"

export default function Chat() {
    const [state, stateSet] = React.useState<User>({
        user: "",
        content: "",
    });

    const [{ error, data: chatmsgs }, reExecuteMsgSub] = useMessageSub(urql.SUBSCRIBE_MESSAGES);

    const [{error: statusSubError, data: statusalert}, reExecuteStatusSub] = useStatusSub(urql.SUBSCRIBE_STATUS);

    const [{ error: mutationErr }, reExecuteMsgMutation] = useMsgMutation(urql.SEND_MESSAGE);  // unlike useQuery useMutation doesn't run automatically but we need to call reExecuteMutation
    
    const [{ error: statusError }, reExecuteStatusQuery] = useStatusQuery(urql.SEND_STATUS);

    function handleSend() {
        if(state.content.length > 0 || state.user.length > 0)
            reExecuteMsgMutation({ user: state.user, content: state.content })
        else 
            console.log("No empty messages");
    }

    if(error) {
        console.log(error);
    }

    if(statusError || statusSubError) {
        console.log("error getting status");
    }

    return (
        <div className='container-fluid'>
            <Messages 
                msgs={chatmsgs} 
                state={state}
            />
            {statusalert && <small>{statusalert}</small>}
            <div className='row'>
                <div className='column' style={{ padding: 0 }}>
                    <input
                        placeholder="User" 
                        value={state.user} 
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                            stateSet({
                                ...state,
                                user: evt.target.value,
                            })
                        }} 
                    />
                </div>
                <div className='column'>
                    <input
                        placeholder="Content"
                        value={state.content}
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                            if(state.user.length > 0) {
                                reExecuteStatusQuery();
                            }
                            stateSet({
                                ...state,
                                content: evt.target.value,
                            })
                        }
                        }
                    />
                </div>
                <div className='colunm' style={{ padding: 0 }}>
                    <button onClick={() => handleSend()} style={{ width: "100%" }}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}
