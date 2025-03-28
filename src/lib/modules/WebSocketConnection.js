import { UpdateHandler } from './hub/UpdateHandler.js';
import { env } from '$env/dynamic/public';
import { isHubClosed } from '$lib/stores/Stores.js';

export class WebSocketConnection {
    constructor(hubId) {
        this.hubId = hubId;
        this.ws = null;
        this.updateHandler = new UpdateHandler();

        // Connection settings
        this.connectionTimeout = 600000;
        this.timeoutId = null;

        // Reconnection settings
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.baseReconnectDelay = 2000; // Start with 2 seconds
        this.maxReconnectDelay = 30000; // Max 30 seconds between attempts
    }

    connect() {
        try {
            const wsUrl = `${env.PUBLIC_WS_HUB_ENDPOINT}/${this.hubId}`;

            this.ws = new WebSocket(wsUrl);

            // Set connection timeout
            this.timeoutId = setTimeout(() => {
                if (this.ws.readyState !== WebSocket.OPEN) {
                    this.ws.close();
                    throw new Error('Connection timeout');
                }
            }, this.connectionTimeout);

            this.ws.onopen = this.handleOpen.bind(this);
            this.ws.onmessage = this.handleMessage.bind(this);
            this.ws.onclose = this.handleClose.bind(this);
            this.ws.onerror = this.handleError.bind(this);
            isHubClosed.set(false);

            return this;
        } catch (error) {
            console.error('Failed to create WebSocket connection:', error);
            throw new Error('Failed to create WebSocket connection');
        }
    }

    handleOpen() {
        console.log('WebSocket connected');
        clearTimeout(this.timeoutId);
        this.reconnectAttempts = 0;
    }

    handleMessage(event) {
        try {
            const update = JSON.parse(event.data);
            if (update && update.name) {
                this.updateHandler.handle(update);
            } else {
                console.warn('Received message in unexpected format:', update);
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }

    handleClose(event) {
        clearTimeout(this.timeoutId);

        const normalClosure = event.code === 1000;
        console.log(
            `WebSocket closed ${normalClosure ? 'normally' : 'abnormally'}:`,
            event.code,
            event.reason
        );

        if (!normalClosure && this.shouldReconnect()) {
            this.attemptReconnect();
        }
        if (!this.shouldReconnect()) {
            isHubClosed.set(true);
        }
    }

    handleError(error) {
        console.error('WebSocket error:', error);
    }

    shouldReconnect() {
        return this.reconnectAttempts < this.maxReconnectAttempts;
    }

    attemptReconnect() {
        // Calculate delay with exponential backoff and jitter
        const exponentialDelay = this.baseReconnectDelay * Math.pow(2, this.reconnectAttempts);
        const jitter = Math.random() * 1000; // Add up to 1 second of random jitter
        const delay = Math.min(exponentialDelay + jitter, this.maxReconnectDelay);

        console.log(`Attempting to reconnect (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts}) in ${Math.round(delay)}ms...`);

        setTimeout(() => {
            this.reconnectAttempts++;
            this.connect();
        }, delay);
    }

    disconnect() {
        if (this.ws) {
            clearTimeout(this.timeoutId);
            this.ws.close(1000, 'Client disconnecting');
            this.ws = null;
        }
    }

    isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    send(command) {
        if (!this.isConnected()) {
            throw new Error('WebSocket is not connected');
        }

        try {
            this.ws.send(JSON.stringify(command));
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
}

export function openConnection(hubId) {
    if (!hubId) {
        throw new Error('hubId is required');
    }

    const connection = new WebSocketConnection(hubId);
    return connection.connect();
}

export default openConnection;