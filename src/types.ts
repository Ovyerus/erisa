import Eris from 'eris';
import Erisa from './Erisa';

/** A type that is either just the given types, or a Promise that resolves to them. */
type OptionalAsync<T> = Promise<T> | T;

/** A function that gets passed to Erisa#use to handle incoming events. */
export type MiddlewareHandler = (generalArgs: {event: string; erisa: Erisa}, ...eventArgs: any[]) => OptionalAsync<Error | void>;
export type Matchable = string | RegExp;

export interface ErisaOptions {
    erisOptions?: Eris.ClientOptions;
}

export interface AwaitMessageOptions {
    timeout: number;
    filter(msg: Eris.Message): boolean;
}

/**
 * An object represnting a Promise that can be watched and triggered at different places.
 */
export interface DeferredPromise<T> {
    promise: Promise<T>;
    resolve(value?: T): Promise<T>;
    reject(error?: T): Promise<T>;
}

export interface AwaitingObject {
    p: DeferredPromise;
    timer: NodeJS.Timer;
    filter(msg: Eris.Message): boolean;
}

/**
 * An error that is thrown when an `awaitMessage` call expires.
 */
export class AwaitTimeout extends Error {
    /* istanbul ignore next */
    constructor(message) {
        super(message);
        this.name = 'AwaitTimeout';
        this.stack = new Error().stack;
    }
}
