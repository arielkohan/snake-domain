import { Coordinates } from './coordinates';

export enum CrashType {
    CRASH_WITH_LIMITS = 'crash_with_limits',
    CRASH_WITH_SELF = 'crash_with_self'
}

export class CrashError extends Error {
    crashType: CrashType;
    crashCoordinates: Coordinates;

    constructor(crashType: CrashType, crashCoordinates: Coordinates) {
        super()
        this.crashType = crashType;
        this.crashCoordinates = crashCoordinates;
    }
}