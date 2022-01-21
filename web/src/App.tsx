import React, { createContext, useContext } from 'react'
import Chat from "./components/Chat";
import { Provider, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { Client, createClient as createWSClient } from 'graphql-ws';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const wsClient = createWSClient({
    url: 'ws://localhost:4000/graphql',
    retryAttempts: 3
});

const client = createClient({
    url: '/graphql',
    exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
            forwardSubscription: (operation) => ({
                subscribe: (sink) => ({
                    unsubscribe: wsClient.subscribe(operation, sink),
                }),
            }),
        }),
    ],
});

const SocketContext = createContext<Client>(wsClient);

export function useSocket() {
    return useContext(SocketContext)
} 

export default function App() {
    return (
        <BrowserRouter>
            <SocketContext.Provider value={wsClient}>
                <Provider value={client}>
                    <Routes>
                        <Route path="/" element={<Chat />}/>
                    </Routes>
                </Provider>
            </SocketContext.Provider>
        </BrowserRouter>
    )
}
