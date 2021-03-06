/** @private */
export declare class AbortController implements AbortSignal {
    private isAborted;
    onabort: (() => void) | null;
    abort(): void;
    readonly signal: AbortSignal;
    readonly aborted: boolean;
}
/** Represents a signal that can be monitored to determine if a request has been aborted. */
export interface AbortSignal {
    /** Indicates if the request has been aborted. */
    aborted: boolean;
    /** Set this to a handler that will be invoked when the request is aborted. */
    onabort: (() => void) | null;
}
import "es6-promise/dist/es6-promise.auto.js";
//export * from "./index";
//import { HttpClient, HttpRequest, HttpResponse } from "./HttpClient";
//import { ILogger } from "./ILogger";
/** Default implementation of {@link @microsoft/signalr.HttpClient}. */
export declare class DefaultHttpClient extends HttpClient {
    private readonly httpClient;
    /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
    constructor(logger: ILogger);
    /** @inheritDoc */
    send(request: HttpRequest): Promise<HttpResponse>;
    getCookieString(url: string): string;
}
//import { IRetryPolicy, RetryContext } from "./IRetryPolicy";
/** @private */
export declare class DefaultReconnectPolicy implements IRetryPolicy {
    private readonly retryDelays;
    constructor(retryDelays?: number[]);
    nextRetryDelayInMilliseconds(retryContext: RetryContext): number | null;
}
//import { HttpClient, HttpResponse } from "./HttpClient";
//import { ILogger } from "./ILogger";
/** @private */
export declare class NodeHttpClient extends HttpClient {
    constructor(logger: ILogger);
    send(): Promise<HttpResponse>;
}
/** Error thrown when an HTTP request fails. */
export declare class HttpError extends Error {
    private __proto__;
    /** The HTTP status code represented by this error. */
    statusCode: number;
    /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
     *
     * @param {string} errorMessage A descriptive error message.
     * @param {number} statusCode The HTTP status code represented by this error.
     */
    constructor(errorMessage: string, statusCode: number);
}
/** Error thrown when a timeout elapses. */
export declare class TimeoutError extends Error {
    private __proto__;
    /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    constructor(errorMessage?: string);
}
/** Error thrown when an action is aborted. */
export declare class AbortError extends Error {
    private __proto__;
    /** Constructs a new instance of {@link AbortError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    constructor(errorMessage?: string);
}
/** @private */
export interface HandshakeRequestMessage {
    readonly protocol: string;
    readonly version: number;
}
/** @private */
export interface HandshakeResponseMessage {
    readonly error: string;
    readonly minorVersion: number;
}
/** @private */
export declare class HandshakeProtocol {
    writeHandshakeRequest(handshakeRequest: HandshakeRequestMessage): string;
    parseHandshakeResponse(data: any): [any, HandshakeResponseMessage];
}
//import { AbortSignal } from "./AbortController";
/** Represents an HTTP request. */
export interface HttpRequest {
    /** The HTTP method to use for the request. */
    method?: string;
    /** The URL for the request. */
    url?: string;
    /** The body content for the request. May be a string or an ArrayBuffer (for binary data). */
    content?: string | ArrayBuffer;
    /** An object describing headers to apply to the request. */
    headers?: {
        [key: string]: string;
    };
    /** The XMLHttpRequestResponseType to apply to the request. */
    responseType?: XMLHttpRequestResponseType;
    /** An AbortSignal that can be monitored for cancellation. */
    abortSignal?: AbortSignal;
    /** The time to wait for the request to complete before throwing a TimeoutError. Measured in milliseconds. */
    timeout?: number;
}
/** Represents an HTTP response. */
export declare class HttpResponse {
    readonly statusCode: number;
    readonly statusText?: string | undefined;
    readonly content?: string | ArrayBuffer | undefined;
    /** Constructs a new instance of {@link @microsoft/signalr.HttpResponse} with the specified status code.
     *
     * @param {number} statusCode The status code of the response.
     */
    constructor(statusCode: number);
    /** Constructs a new instance of {@link @microsoft/signalr.HttpResponse} with the specified status code and message.
     *
     * @param {number} statusCode The status code of the response.
     * @param {string} statusText The status message of the response.
     */
    constructor(statusCode: number, statusText: string);
    /** Constructs a new instance of {@link @microsoft/signalr.HttpResponse} with the specified status code, message and string content.
     *
     * @param {number} statusCode The status code of the response.
     * @param {string} statusText The status message of the response.
     * @param {string} content The content of the response.
     */
    constructor(statusCode: number, statusText: string, content: string);
    /** Constructs a new instance of {@link @microsoft/signalr.HttpResponse} with the specified status code, message and binary content.
     *
     * @param {number} statusCode The status code of the response.
     * @param {string} statusText The status message of the response.
     * @param {ArrayBuffer} content The content of the response.
     */
    constructor(statusCode: number, statusText: string, content: ArrayBuffer);
}
/** Abstraction over an HTTP client.
 *
 * This class provides an abstraction over an HTTP client so that a different implementation can be provided on different platforms.
 */
export declare abstract class HttpClient {
    /** Issues an HTTP GET request to the specified URL, returning a Promise that resolves with an {@link @microsoft/signalr.HttpResponse} representing the result.
     *
     * @param {string} url The URL for the request.
     * @returns {Promise<HttpResponse>} A Promise that resolves with an {@link @microsoft/signalr.HttpResponse} describing the response, or rejects with an Error indicating a failure.
     */
    get(url: string): Promise<HttpResponse>;
    /** Issues an HTTP GET request to the specified URL, returning a Promise that resolves with an {@link @microsoft/signalr.HttpResponse} representing the result.
     *
     * @param {string} url The URL for the request.
     * @param {HttpRequest} options Additional options to configure the request. The 'url' field in this object will be overridden by the url parameter.
     * @returns {Promise<HttpResponse>} A Promise that resolves with an {@link @microsoft/signalr.HttpResponse} describing the response, or rejects with an Error indicating a failure.
     */
    get(url: string, options: HttpRequest): Promise<HttpResponse>;
    /** Issues an HTTP POST request to the specified URL, returning a Promise that resolves with an {@link @microsoft/signalr.HttpResponse} representing the result.
     *
     * @param {string} url The URL for the request.
     * @returns {Promise<HttpResponse>} A Promise that resolves with an {@link @microsoft/signalr.HttpResponse} describing the response, or rejects with an Error indicating a failure.
     */
    post(url: string): Promise<HttpResponse>;
    /** Issues an HTTP POST request to the specified URL, returning a Promise that resolves with an {@link @microsoft/signalr.HttpResponse} representing the result.
     *
     * @param {string} url The URL for the request.
     * @param {HttpRequest} options Additional options to configure the request. The 'url' field in this object will be overridden by the url parameter.
     * @returns {Promise<HttpResponse>} A Promise that resolves with an {@link @microsoft/signalr.HttpResponse} describing the response, or rejects with an Error indicating a failure.
     */
    post(url: string, options: HttpRequest): Promise<HttpResponse>;
    /** Issues an HTTP DELETE request to the specified URL, returning a Promise that resolves with an {@link @microsoft/signalr.HttpResponse} representing the result.
     *
     * @param {string} url The URL for the request.
     * @returns {Promise<HttpResponse>} A Promise that resolves with an {@link @microsoft/signalr.HttpResponse} describing the response, or rejects with an Error indicating a failure.
     */
    delete(url: string): Promise<HttpResponse>;
    /** Issues an HTTP DELETE request to the specified URL, returning a Promise that resolves with an {@link @microsoft/signalr.HttpResponse} representing the result.
     *
     * @param {string} url The URL for the request.
     * @param {HttpRequest} options Additional options to configure the request. The 'url' field in this object will be overridden by the url parameter.
     * @returns {Promise<HttpResponse>} A Promise that resolves with an {@link @microsoft/signalr.HttpResponse} describing the response, or rejects with an Error indicating a failure.
     */
    delete(url: string, options: HttpRequest): Promise<HttpResponse>;
    /** Issues an HTTP request to the specified URL, returning a {@link Promise} that resolves with an {@link @microsoft/signalr.HttpResponse} representing the result.
     *
     * @param {HttpRequest} request An {@link @microsoft/signalr.HttpRequest} describing the request to send.
     * @returns {Promise<HttpResponse>} A Promise that resolves with an HttpResponse describing the response, or rejects with an Error indicating a failure.
     */
    abstract send(request: HttpRequest): Promise<HttpResponse>;
    /** Gets all cookies that apply to the specified URL.
     *
     * @param url The URL that the cookies are valid for.
     * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
     */
    getCookieString(url: string): string;
}
//import { IConnection } from "./IConnection";
//import { IHttpConnectionOptions } from "./IHttpConnectionOptions";
//import { HttpTransportType, ITransport, TransferFormat } from "./ITransport";
/** @private */
export interface INegotiateResponse {
    connectionId?: string;
    connectionToken?: string;
    negotiateVersion?: number;
    availableTransports?: IAvailableTransport[];
    url?: string;
    accessToken?: string;
    error?: string;
}
/** @private */
export interface IAvailableTransport {
    transport: keyof typeof HttpTransportType;
    transferFormats: Array<keyof typeof TransferFormat>;
}
/** @private */
export declare class HttpConnection implements IConnection {
    private connectionState;
    private connectionStarted;
    private readonly httpClient;
    private readonly logger;
    private readonly options;
    private transport?;
    private startInternalPromise?;
    private stopPromise?;
    private stopPromiseResolver;
    private stopError?;
    private accessTokenFactory?;
    private sendQueue?;
    readonly features: any;
    baseUrl: string;
    connectionId?: string;
    onreceive: ((data: string | ArrayBuffer) => void) | null;
    onclose: ((e?: Error) => void) | null;
    private readonly negotiateVersion;
    constructor(url: string, options?: IHttpConnectionOptions);
    start(): Promise<void>;
    start(transferFormat: TransferFormat): Promise<void>;
    send(data: string | ArrayBuffer): Promise<void>;
    stop(error?: Error): Promise<void>;
    private stopInternal;
    private startInternal;
    private getNegotiationResponse;
    private createConnectUrl;
    private createTransport;
    private constructTransport;
    private startTransport;
    private resolveTransportOrError;
    private isITransport;
    private stopConnection;
    private resolveUrl;
    private resolveNegotiateUrl;
}
/** @private */
export declare class TransportSendQueue {
    private readonly transport;
    private buffer;
    private sendBufferedData;
    private executing;
    private transportResult?;
    private sendLoopPromise;
    constructor(transport: ITransport);
    send(data: string | ArrayBuffer): Promise<void>;
    stop(): Promise<void>;
    private bufferData;
    private sendLoop;
    private static concatBuffers;
}
//import { IStreamResult } from "./Stream";
/** Describes the current state of the {@link HubConnection} to the server. */
export declare enum HubConnectionState {
    /** The hub connection is disconnected. */
    Disconnected = "Disconnected",
    /** The hub connection is connecting. */
    Connecting = "Connecting",
    /** The hub connection is connected. */
    Connected = "Connected",
    /** The hub connection is disconnecting. */
    Disconnecting = "Disconnecting",
    /** The hub connection is reconnecting. */
    Reconnecting = "Reconnecting"
}
/** Represents a connection to a SignalR Hub. */
export declare class HubConnection {
    private readonly cachedPingMessage;
    private readonly connection;
    private readonly logger;
    private readonly reconnectPolicy?;
    private protocol;
    private handshakeProtocol;
    private callbacks;
    private methods;
    private invocationId;
    private closedCallbacks;
    private reconnectingCallbacks;
    private reconnectedCallbacks;
    private receivedHandshakeResponse;
    private handshakeResolver;
    private handshakeRejecter;
    private stopDuringStartError?;
    private connectionState;
    private connectionStarted;
    private startPromise?;
    private stopPromise?;
    private reconnectDelayHandle?;
    private timeoutHandle?;
    private pingServerHandle?;
    /** The server timeout in milliseconds.
     *
     * If this timeout elapses without receiving any messages from the server, the connection will be terminated with an error.
     * The default timeout value is 30,000 milliseconds (30 seconds).
     */
    serverTimeoutInMilliseconds: number;
    /** Default interval at which to ping the server.
     *
     * The default value is 15,000 milliseconds (15 seconds).
     * Allows the server to detect hard disconnects (like when a client unplugs their computer).
     */
    keepAliveIntervalInMilliseconds: number;
    private constructor();
    /** Indicates the state of the {@link HubConnection} to the server. */
    readonly state: HubConnectionState;
    /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
     *  in the disconnected state or if the negotiation step was skipped.
     */
    readonly connectionId: string | null;
    /** Indicates the url of the {@link HubConnection} to the server. */
    /**
    * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
    * Reconnecting states.
    * @param {string} url The url to connect to.
    */
    baseUrl: string;
    /** Starts the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
     */
    start(): Promise<void>;
    private startWithStateTransitions;
    private startInternal;
    /** Stops the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
     */
    stop(): Promise<void>;
    private stopInternal;
    /** Invokes a streaming hub method on the server using the specified name and arguments.
     *
     * @typeparam T The type of the items returned by the server.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
     */
    stream<T = any>(methodName: string, ...args: any[]): IStreamResult<T>;
    private sendMessage;
    /**
     * Sends a js object to the server.
     * @param message The js object to serialize and send.
     */
    private sendWithProtocol;
    /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
     *
     * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
     * be processing the invocation.
     *
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
     */
    send(methodName: string, ...args: any[]): Promise<void>;
    /** Invokes a hub method on the server using the specified name and arguments.
     *
     * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
     * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
     * resolving the Promise.
     *
     * @typeparam T The expected return type.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
     */
    invoke<T = any>(methodName: string, ...args: any[]): Promise<T>;
    /** Registers a handler that will be invoked when the hub method with the specified method name is invoked.
     *
     * @param {string} methodName The name of the hub method to define.
     * @param {Function} newMethod The handler that will be raised when the hub method is invoked.
     */
    on(methodName: string, newMethod: (...args: any[]) => void): void;
    /** Removes all handlers for the specified hub method.
     *
     * @param {string} methodName The name of the method to remove handlers for.
     */
    off(methodName: string): void;
    /** Removes the specified handler for the specified hub method.
     *
     * You must pass the exact same Function instance as was previously passed to {@link @microsoft/signalr.HubConnection.on}. Passing a different instance (even if the function
     * body is the same) will not remove the handler.
     *
     * @param {string} methodName The name of the method to remove handlers for.
     * @param {Function} method The handler to remove. This must be the same Function instance as the one passed to {@link @microsoft/signalr.HubConnection.on}.
     */
    off(methodName: string, method: (...args: any[]) => void): void;
    /** Registers a handler that will be invoked when the connection is closed.
     *
     * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
     */
    onclose(callback: (error?: Error) => void): void;
    /** Registers a handler that will be invoked when the connection starts reconnecting.
     *
     * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
     */
    onreconnecting(callback: (error?: Error) => void): void;
    /** Registers a handler that will be invoked when the connection successfully reconnects.
     *
     * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
     */
    onreconnected(callback: (connectionId?: string) => void): void;
    private processIncomingData;
    private processHandshakeResponse;
    private resetKeepAliveInterval;
    private resetTimeoutPeriod;
    private serverTimeout;
    private invokeClientMethod;
    private connectionClosed;
    private completeClose;
    private reconnect;
    private getNextRetryDelay;
    private cancelCallbacksWithError;
    private cleanupPingTimer;
    private cleanupTimeout;
    private createInvocation;
    private launchStreams;
    private replaceStreamingParams;
    private isObservable;
    private createStreamInvocation;
    private createCancelInvocation;
    private createStreamItemMessage;
    private createCompletionMessage;
}
//import { HubConnection } from "./HubConnection";
//import { IHttpConnectionOptions } from "./IHttpConnectionOptions";
//import { IHubProtocol } from "./IHubProtocol";
//import { ILogger, LogLevel } from "./ILogger";
//import { IRetryPolicy } from "./IRetryPolicy";
//import { HttpTransportType } from "./ITransport";
/** A builder for configuring {@link @microsoft/signalr.HubConnection} instances. */
export declare class HubConnectionBuilder {
    /** Configures console logging for the {@link @microsoft/signalr.HubConnection}.
     *
     * @param {LogLevel} logLevel The minimum level of messages to log. Anything at this level, or a more severe level, will be logged.
     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
     */
    configureLogging(logLevel: LogLevel): HubConnectionBuilder;
    /** Configures custom logging for the {@link @microsoft/signalr.HubConnection}.
     *
     * @param {ILogger} logger An object implementing the {@link @microsoft/signalr.ILogger} interface, which will be used to write all log messages.
     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
     */
    configureLogging(logger: ILogger): HubConnectionBuilder;
    /** Configures custom logging for the {@link @microsoft/signalr.HubConnection}.
     *
     * @param {string} logLevel A string representing a LogLevel setting a minimum level of messages to log.
     *    See {@link https://docs.microsoft.com/en-us/aspnet/core/signalr/configuration#configure-logging|the documentation for client logging configuration} for more details.
     */
    configureLogging(logLevel: string): HubConnectionBuilder;
    /** Configures custom logging for the {@link @microsoft/signalr.HubConnection}.
     *
     * @param {LogLevel | string | ILogger} logging A {@link @microsoft/signalr.LogLevel}, a string representing a LogLevel, or an object implementing the {@link @microsoft/signalr.ILogger} interface.
     *    See {@link https://docs.microsoft.com/en-us/aspnet/core/signalr/configuration#configure-logging|the documentation for client logging configuration} for more details.
     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
     */
    configureLogging(logging: LogLevel | string | ILogger): HubConnectionBuilder;
    /** Configures the {@link @microsoft/signalr.HubConnection} to use HTTP-based transports to connect to the specified URL.
     *
     * The transport will be selected automatically based on what the server and client support.
     *
     * @param {string} url The URL the connection will use.
     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
     */
    withUrl(url: string): HubConnectionBuilder;
    /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified HTTP-based transport to connect to the specified URL.
     *
     * @param {string} url The URL the connection will use.
     * @param {HttpTransportType} transportType The specific transport to use.
     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
     */
    withUrl(url: string, transportType: HttpTransportType): HubConnectionBuilder;
    /** Configures the {@link @microsoft/signalr.HubConnection} to use HTTP-based transports to connect to the specified URL.
     *
     * @param {string} url The URL the connection will use.
     * @param {IHttpConnectionOptions} options An options object used to configure the connection.
     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
     */
    withUrl(url: string, options: IHttpConnectionOptions): HubConnectionBuilder;
    /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
     *
     * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
     */
    withHubProtocol(protocol: IHubProtocol): HubConnectionBuilder;
    /** Configures the {@link @microsoft/signalr.HubConnection} to automatically attempt to reconnect if the connection is lost.
     * By default, the client will wait 0, 2, 10 and 30 seconds respectively before trying up to 4 reconnect attempts.
     */
    withAutomaticReconnect(): HubConnectionBuilder;
    /** Configures the {@link @microsoft/signalr.HubConnection} to automatically attempt to reconnect if the connection is lost.
     *
     * @param {number[]} retryDelays An array containing the delays in milliseconds before trying each reconnect attempt.
     * The length of the array represents how many failed reconnect attempts it takes before the client will stop attempting to reconnect.
     */
    withAutomaticReconnect(retryDelays: number[]): HubConnectionBuilder;
    /** Configures the {@link @microsoft/signalr.HubConnection} to automatically attempt to reconnect if the connection is lost.
     *
     * @param {IRetryPolicy} reconnectPolicy An {@link @microsoft/signalR.IRetryPolicy} that controls the timing and number of reconnect attempts.
     */
    withAutomaticReconnect(reconnectPolicy: IRetryPolicy): HubConnectionBuilder;
    /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
     *
     * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
     */
    build(): HubConnection;
}
//import { TransferFormat } from "./ITransport";
/** @private */
export interface IConnection {
    readonly features: any;
    readonly connectionId?: string;
    baseUrl: string;
    start(transferFormat: TransferFormat): Promise<void>;
    send(data: string | ArrayBuffer): Promise<void>;
    stop(error?: Error): Promise<void>;
    onreceive: ((data: string | ArrayBuffer) => void) | null;
    onclose: ((error?: Error) => void) | null;
}
//import { HttpClient } from "./HttpClient";
//import { ILogger, LogLevel } from "./ILogger";
//import { HttpTransportType, ITransport } from "./ITransport";
/** Options provided to the 'withUrl' method on {@link @microsoft/signalr.HubConnectionBuilder} to configure options for the HTTP-based transports. */
export interface IHttpConnectionOptions {
    /** An {@link @microsoft/signalr.HttpClient} that will be used to make HTTP requests. */
    httpClient?: HttpClient;
    /** An {@link @microsoft/signalr.HttpTransportType} value specifying the transport to use for the connection. */
    transport?: HttpTransportType | ITransport;
    /** Configures the logger used for logging.
     *
     * Provide an {@link @microsoft/signalr.ILogger} instance, and log messages will be logged via that instance. Alternatively, provide a value from
     * the {@link @microsoft/signalr.LogLevel} enumeration and a default logger which logs to the Console will be configured to log messages of the specified
     * level (or higher).
     */
    logger?: ILogger | LogLevel;
    /** A function that provides an access token required for HTTP Bearer authentication.
     *
     * @returns {string | Promise<string>} A string containing the access token, or a Promise that resolves to a string containing the access token.
     */
    accessTokenFactory?(): string | Promise<string>;
    /** A boolean indicating if message content should be logged.
     *
     * Message content can contain sensitive user data, so this is disabled by default.
     */
    logMessageContent?: boolean;
    /** A boolean indicating if negotiation should be skipped.
     *
     * Negotiation can only be skipped when the {@link @microsoft/signalr.IHttpConnectionOptions.transport} property is set to 'HttpTransportType.WebSockets'.
     */
    skipNegotiation?: boolean;
}
//import { ILogger } from "./ILogger";
//import { TransferFormat } from "./ITransport";
/** Defines the type of a Hub Message. */
export declare enum MessageType {
    /** Indicates the message is an Invocation message and implements the {@link @microsoft/signalr.InvocationMessage} interface. */
    Invocation = 1,
    /** Indicates the message is a StreamItem message and implements the {@link @microsoft/signalr.StreamItemMessage} interface. */
    StreamItem = 2,
    /** Indicates the message is a Completion message and implements the {@link @microsoft/signalr.CompletionMessage} interface. */
    Completion = 3,
    /** Indicates the message is a Stream Invocation message and implements the {@link @microsoft/signalr.StreamInvocationMessage} interface. */
    StreamInvocation = 4,
    /** Indicates the message is a Cancel Invocation message and implements the {@link @microsoft/signalr.CancelInvocationMessage} interface. */
    CancelInvocation = 5,
    /** Indicates the message is a Ping message and implements the {@link @microsoft/signalr.PingMessage} interface. */
    Ping = 6,
    /** Indicates the message is a Close message and implements the {@link @microsoft/signalr.CloseMessage} interface. */
    Close = 7
}
/** Defines a dictionary of string keys and string values representing headers attached to a Hub message. */
export interface MessageHeaders {
    /** Gets or sets the header with the specified key. */
    [key: string]: string;
}
/** Union type of all known Hub messages. */
export declare type HubMessage = InvocationMessage | StreamInvocationMessage | StreamItemMessage | CompletionMessage | CancelInvocationMessage | PingMessage | CloseMessage;
/** Defines properties common to all Hub messages. */
export interface HubMessageBase {
    /** A {@link @microsoft/signalr.MessageType} value indicating the type of this message. */
    readonly type: MessageType;
}
/** Defines properties common to all Hub messages relating to a specific invocation. */
export interface HubInvocationMessage extends HubMessageBase {
    /** A {@link @microsoft/signalr.MessageHeaders} dictionary containing headers attached to the message. */
    readonly headers?: MessageHeaders;
    /** The ID of the invocation relating to this message.
     *
     * This is expected to be present for {@link @microsoft/signalr.StreamInvocationMessage} and {@link @microsoft/signalr.CompletionMessage}. It may
     * be 'undefined' for an {@link @microsoft/signalr.InvocationMessage} if the sender does not expect a response.
     */
    readonly invocationId?: string;
}
/** A hub message representing a non-streaming invocation. */
export interface InvocationMessage extends HubInvocationMessage {
    /** @inheritDoc */
    readonly type: MessageType.Invocation;
    /** The target method name. */
    readonly target: string;
    /** The target method arguments. */
    readonly arguments: any[];
    /** The target methods stream IDs. */
    readonly streamIds: string[];
}
/** A hub message representing a streaming invocation. */
export interface StreamInvocationMessage extends HubInvocationMessage {
    /** @inheritDoc */
    readonly type: MessageType.StreamInvocation;
    /** The invocation ID. */
    readonly invocationId: string;
    /** The target method name. */
    readonly target: string;
    /** The target method arguments. */
    readonly arguments: any[];
    /** The target methods stream IDs. */
    readonly streamIds: string[];
}
/** A hub message representing a single item produced as part of a result stream. */
export interface StreamItemMessage extends HubInvocationMessage {
    /** @inheritDoc */
    readonly type: MessageType.StreamItem;
    /** The invocation ID. */
    readonly invocationId: string;
    /** The item produced by the server. */
    readonly item?: any;
}
/** A hub message representing the result of an invocation. */
export interface CompletionMessage extends HubInvocationMessage {
    /** @inheritDoc */
    readonly type: MessageType.Completion;
    /** The invocation ID. */
    readonly invocationId: string;
    /** The error produced by the invocation, if any.
     *
     * Either {@link @microsoft/signalr.CompletionMessage.error} or {@link @microsoft/signalr.CompletionMessage.result} must be defined, but not both.
     */
    readonly error?: string;
    /** The result produced by the invocation, if any.
     *
     * Either {@link @microsoft/signalr.CompletionMessage.error} or {@link @microsoft/signalr.CompletionMessage.result} must be defined, but not both.
     */
    readonly result?: any;
}
/** A hub message indicating that the sender is still active. */
export interface PingMessage extends HubMessageBase {
    /** @inheritDoc */
    readonly type: MessageType.Ping;
}
/** A hub message indicating that the sender is closing the connection.
 *
 * If {@link @microsoft/signalr.CloseMessage.error} is defined, the sender is closing the connection due to an error.
 */
export interface CloseMessage extends HubMessageBase {
    /** @inheritDoc */
    readonly type: MessageType.Close;
    /** The error that triggered the close, if any.
     *
     * If this property is undefined, the connection was closed normally and without error.
     */
    readonly error?: string;
    /** If true, clients with automatic reconnects enabled should attempt to reconnect after receiving the CloseMessage. Otherwise, they should not. */
    readonly allowReconnect?: boolean;
}
/** A hub message sent to request that a streaming invocation be canceled. */
export interface CancelInvocationMessage extends HubInvocationMessage {
    /** @inheritDoc */
    readonly type: MessageType.CancelInvocation;
    /** The invocation ID. */
    readonly invocationId: string;
}
/** A protocol abstraction for communicating with SignalR Hubs.  */
export interface IHubProtocol {
    /** The name of the protocol. This is used by SignalR to resolve the protocol between the client and server. */
    readonly name: string;
    /** The version of the protocol. */
    readonly version: number;
    /** The {@link @microsoft/signalr.TransferFormat} of the protocol. */
    readonly transferFormat: TransferFormat;
    /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
     *
     * If {@link @microsoft/signalr.IHubProtocol.transferFormat} is 'Text', the `input` parameter must be a string, otherwise it must be an ArrayBuffer.
     *
     * @param {string | ArrayBuffer} input A string, ArrayBuffer, or Buffer containing the serialized representation.
     * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
     */
    parseMessages(input: string | ArrayBuffer, logger: ILogger): HubMessage[];
    /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string or ArrayBuffer and returns it.
     *
     * If {@link @microsoft/signalr.IHubProtocol.transferFormat} is 'Text', the result of this method will be a string, otherwise it will be an ArrayBuffer.
     *
     * @param {HubMessage} message The message to write.
     * @returns {string | ArrayBuffer} A string or ArrayBuffer containing the serialized representation of the message.
     */
    writeMessage(message: HubMessage): string | ArrayBuffer;
}
/** Indicates the severity of a log message.
 *
 * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
 */
export declare enum LogLevel {
    /** Log level for very low severity diagnostic messages. */
    Trace = 0,
    /** Log level for low severity diagnostic messages. */
    Debug = 1,
    /** Log level for informational diagnostic messages. */
    Information = 2,
    /** Log level for diagnostic messages that indicate a non-fatal problem. */
    Warning = 3,
    /** Log level for diagnostic messages that indicate a failure in the current operation. */
    Error = 4,
    /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
    Critical = 5,
    /** The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted. */
    None = 6
}
/** An abstraction that provides a sink for diagnostic messages. */
export interface ILogger {
    /** Called by the framework to emit a diagnostic message.
     *
     * @param {LogLevel} logLevel The severity level of the message.
     * @param {string} message The message.
     */
    log(logLevel: LogLevel, message: string): void;
}
/** The version of the SignalR client. */
export declare const VERSION: string;
// export { AbortSignal } from "./AbortController";
// export { AbortError, HttpError, TimeoutError } from "./Errors";
// export { HttpClient, HttpRequest, HttpResponse } from "./HttpClient";
// export { DefaultHttpClient } from "./DefaultHttpClient";
// export { IHttpConnectionOptions } from "./IHttpConnectionOptions";
// export { HubConnection, HubConnectionState } from "./HubConnection";
// export { HubConnectionBuilder } from "./HubConnectionBuilder";
// export { MessageType, MessageHeaders, HubMessage, HubMessageBase, HubInvocationMessage, InvocationMessage, StreamInvocationMessage, StreamItemMessage, CompletionMessage, PingMessage, CloseMessage, CancelInvocationMessage, IHubProtocol } from "./IHubProtocol";
// export { ILogger, LogLevel } from "./ILogger";
// export { HttpTransportType, TransferFormat, ITransport } from "./ITransport";
// export { IStreamSubscriber, IStreamResult, ISubscription } from "./Stream";
// export { NullLogger } from "./Loggers";
// export { JsonHubProtocol } from "./JsonHubProtocol";
// export { Subject } from "./Subject";
// export { IRetryPolicy, RetryContext } from "./IRetryPolicy";

export as namespace signalR;
/** An abstraction that controls when the client attempts to reconnect and how many times it does so. */
export interface IRetryPolicy {
    /** Called after the transport loses the connection.
     *
     * @param {RetryContext} retryContext Details related to the retry event to help determine how long to wait for the next retry.
     *
     * @returns {number | null} The amount of time in milliseconds to wait before the next retry. `null` tells the client to stop retrying.
     */
    nextRetryDelayInMilliseconds(retryContext: RetryContext): number | null;
}
export interface RetryContext {
    /**
     * The number of consecutive failed tries so far.
     */
    readonly previousRetryCount: number;
    /**
     * The amount of time in milliseconds spent retrying so far.
     */
    readonly elapsedMilliseconds: number;
    /**
     * The error that forced the upcoming retry.
     */
    readonly retryReason: Error;
}
/** Specifies a specific HTTP transport type. */
export declare enum HttpTransportType {
    /** Specifies no transport preference. */
    None = 0,
    /** Specifies the WebSockets transport. */
    WebSockets = 1,
    /** Specifies the Server-Sent Events transport. */
    ServerSentEvents = 2,
    /** Specifies the Long Polling transport. */
    LongPolling = 4
}
/** Specifies the transfer format for a connection. */
export declare enum TransferFormat {
    /** Specifies that only text data will be transmitted over the connection. */
    Text = 1,
    /** Specifies that binary data will be transmitted over the connection. */
    Binary = 2
}
/** An abstraction over the behavior of transports. This is designed to support the framework and not intended for use by applications. */
export interface ITransport {
    connect(url: string, transferFormat: TransferFormat): Promise<void>;
    send(data: any): Promise<void>;
    stop(): Promise<void>;
    onreceive: ((data: string | ArrayBuffer) => void) | null;
    onclose: ((error?: Error) => void) | null;
}
//import { HubMessage, IHubProtocol } from "./IHubProtocol";
//import { ILogger } from "./ILogger";
//import { TransferFormat } from "./ITransport";
/** Implements the JSON Hub Protocol. */
export declare class JsonHubProtocol implements IHubProtocol {
    /** @inheritDoc */
    readonly name: string;
    /** @inheritDoc */
    readonly version: number;
    /** @inheritDoc */
    readonly transferFormat: TransferFormat;
    /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
     *
     * @param {string} input A string containing the serialized representation.
     * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
     */
    parseMessages(input: string, logger: ILogger): HubMessage[];
    /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
     *
     * @param {HubMessage} message The message to write.
     * @returns {string} A string containing the serialized representation of the message.
     */
    writeMessage(message: HubMessage): string;
    private isInvocationMessage;
    private isStreamItemMessage;
    private isCompletionMessage;
    private assertNotEmptyString;
}
//import { ILogger, LogLevel } from "./ILogger";
/** A logger that does nothing when log messages are sent to it. */
export declare class NullLogger implements ILogger {
    /** The singleton instance of the {@link @microsoft/signalr.NullLogger}. */
    static instance: ILogger;
    private constructor();
    /** @inheritDoc */
    log(_logLevel: LogLevel, _message: string): void;
}
//import { HttpClient } from "./HttpClient";
//import { ILogger } from "./ILogger";
//import { ITransport, TransferFormat } from "./ITransport";
/** @private */
export declare class LongPollingTransport implements ITransport {
    private readonly httpClient;
    private readonly accessTokenFactory;
    private readonly logger;
    private readonly logMessageContent;
    private readonly pollAbort;
    private url?;
    private running;
    private receiving?;
    private closeError?;
    onreceive: ((data: string | ArrayBuffer) => void) | null;
    onclose: ((error?: Error) => void) | null;
    readonly pollAborted: boolean;
    constructor(httpClient: HttpClient, accessTokenFactory: (() => string | Promise<string>) | undefined, logger: ILogger, logMessageContent: boolean);
    connect(url: string, transferFormat: TransferFormat): Promise<void>;
    private getAccessToken;
    private updateHeaderToken;
    private poll;
    send(data: any): Promise<void>;
    stop(): Promise<void>;
    private raiseOnClose;
}
//import { HttpClient, HttpRequest, HttpResponse } from "./HttpClient";
//import { ILogger } from "./ILogger";
/** @private */
// export declare class NodeHttpClient extends HttpClient {
//     private readonly logger;
//     private readonly request;
//     private readonly cookieJar;
//     constructor(logger: ILogger);
//     send(httpRequest: HttpRequest): Promise<HttpResponse>;
//     getCookieString(url: string): string;
// }
/** @private */
//export declare type EventSourceConstructor = new (url: string, eventSourceInitDict?: EventSourceInit) => EventSource;
/** @private */
export interface WebSocketConstructor {
    new (url: string, protocols?: string | string[], options?: any): WebSocket;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
}
/** Defines the expected type for a receiver of results streamed by the server.
 *
 * @typeparam T The type of the items being sent by the server.
 */
export interface IStreamSubscriber<T> {
    /** A boolean that will be set by the {@link @microsoft/signalr.IStreamResult} when the stream is closed. */
    closed?: boolean;
    /** Called by the framework when a new item is available. */
    next(value: T): void;
    /** Called by the framework when an error has occurred.
     *
     * After this method is called, no additional methods on the {@link @microsoft/signalr.IStreamSubscriber} will be called.
     */
    error(err: any): void;
    /** Called by the framework when the end of the stream is reached.
     *
     * After this method is called, no additional methods on the {@link @microsoft/signalr.IStreamSubscriber} will be called.
     */
    complete(): void;
}
/** Defines the result of a streaming hub method.
 *
 * @typeparam T The type of the items being sent by the server.
 */
export interface IStreamResult<T> {
    /** Attaches a {@link @microsoft/signalr.IStreamSubscriber}, which will be invoked when new items are available from the stream.
     *
     * @param {IStreamSubscriber<T>} observer The subscriber to attach.
     * @returns {ISubscription<T>} A subscription that can be disposed to terminate the stream and stop calling methods on the {@link @microsoft/signalr.IStreamSubscriber}.
     */
    subscribe(subscriber: IStreamSubscriber<T>): ISubscription<T>;
}
/** An interface that allows an {@link @microsoft/signalr.IStreamSubscriber} to be disconnected from a stream.
 *
 * @typeparam T The type of the items being sent by the server.
 */
export interface ISubscription<T> {
    /** Disconnects the {@link @microsoft/signalr.IStreamSubscriber} associated with this subscription from the stream. */
    dispose(): void;
}
//import { IStreamResult, IStreamSubscriber, ISubscription } from "./Stream";
/** Stream implementation to stream items to the server. */
export declare class Subject<T> implements IStreamResult<T> {
    constructor();
    next(item: T): void;
    error(err: any): void;
    complete(): void;
    subscribe(observer: IStreamSubscriber<T>): ISubscription<T>;
}
/** @private */
export declare class TextMessageFormat {
    static RecordSeparatorCode: number;
    static RecordSeparator: string;
    static write(output: string): string;
    static parse(input: string): string[];
}
//import { HttpClient } from "./HttpClient";
//import { ILogger, LogLevel } from "./ILogger";
//import { IStreamSubscriber, ISubscription } from "./Stream";
//import { Subject } from "./Subject";
/** @private */
export declare class Arg {
    static isRequired(val: any, name: string): void;
    static isIn(val: any, values: any, name: string): void;
}
/** @private */
export declare class Platform {
    static readonly isBrowser: boolean;
    static readonly isWebWorker: boolean;
    static readonly isNode: boolean;
}
/** @private */
export declare function getDataDetail(data: any, includeContent: boolean): string;
/** @private */
export declare function formatArrayBuffer(data: ArrayBuffer): string;
/** @private */
export declare function isArrayBuffer(val: any): val is ArrayBuffer;
/** @private */
export declare function sendMessage(logger: ILogger, transportName: string, httpClient: HttpClient, url: string, accessTokenFactory: (() => string | Promise<string>) | undefined, content: string | ArrayBuffer, logMessageContent: boolean): Promise<void>;
/** @private */
export declare function createLogger(logger?: ILogger | LogLevel): ILogger;
/** @private */
export declare class SubjectSubscription<T> implements ISubscription<T> {
    private subject;
    private observer;
    constructor(subject: Subject<T>, observer: IStreamSubscriber<T>);
    dispose(): void;
}
/** @private */
export declare class ConsoleLogger implements ILogger {
    private readonly minimumLogLevel;
    outputConsole: {
        error(message: any): void;
        warn(message: any): void;
        info(message: any): void;
        log(message: any): void;
    };
    constructor(minimumLogLevel: LogLevel);
    log(logLevel: LogLevel, message: string): void;
}
//import { HttpClient } from "./HttpClient";
//import { ILogger } from "./ILogger";
//import { ITransport, TransferFormat } from "./ITransport";
//import { WebSocketConstructor } from "./Polyfills";
/** @private */
export declare class WebSocketTransport implements ITransport {
    private readonly logger;
    private readonly accessTokenFactory;
    private readonly logMessageContent;
    private readonly webSocketConstructor;
    private readonly httpClient;
    private webSocket?;
    onreceive: ((data: string | ArrayBuffer) => void) | null;
    onclose: ((error?: Error) => void) | null;
    constructor(httpClient: HttpClient, accessTokenFactory: (() => string | Promise<string>) | undefined, logger: ILogger, logMessageContent: boolean, webSocketConstructor: WebSocketConstructor);
    connect(url: string, transferFormat: TransferFormat): Promise<void>;
    send(data: any): Promise<void>;
    stop(): Promise<void>;
    private close;
}
//import { HttpClient, HttpRequest, HttpResponse } from "./HttpClient";
//import { ILogger } from "./ILogger";
export declare class XhrHttpClient extends HttpClient {
    private readonly logger;
    constructor(logger: ILogger);
    /** @inheritDoc */
    send(request: HttpRequest): Promise<HttpResponse>;
}
