import Command from './Command';

class Context {}
class Erisa {}
interface ICommandPermissions {
    self: string | string[];
    user: string | string[];
    both: string | string[];
}

interface ISubCommandOptions {
    name?: string;
    overview: string;
    description?: string;
    ownerOnly?: boolean;
    guildOnly?: boolean;
    hidden?: boolean;
    aliases?: string[];
    permissions?: ICommandPermissions;
}

export default class SubCommand implements Command {
    name: string;
    overview: string;
    description?: string;
    ownerOnly?: boolean;
    guildOnly?: boolean;
    hidden?: boolean;
    aliases?: string[];
    permissions?: ICommandPermissions;
    main: (ctx: Context) => Promise<any>;

    constructor(options: ISubCommandOptions, main: (ctx: Context) => Promise<any>) {
        this.name = options.name || '';
        this.overview = options.overview;
        this.description = options.description;
        this.ownerOnly = options.ownerOnly || false;
        this.guildOnly = options.guildOnly || false;
        this.hidden = options.hidden || false;
        this.aliases = options.aliases || [];
        this.permissions = options.permissions;
        this.main = main;
    }
}

export function decorator(options: ISubCommandOptions) {
    return function __inner(target: any, property: string, descriptor: PropertyDescriptor) {
        target['_' + property] = target[property];
        descriptor.value = () => new SubCommand(options, target['_' + property]);

        Object.defineProperty(target, '_ ' + property, {
            enumerable: false
        });
    };
}