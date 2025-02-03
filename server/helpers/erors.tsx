export enum ErrorStatus {
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

type ErrorResponse = {
    status: ErrorStatus;
    statusText: string;
};

export class ErrorNotFound {
    info: ErrorResponse;

    constructor(statusText: string) {
        this.info = {
            status: ErrorStatus.NOT_FOUND,
            statusText,
        };
    }
}

export class ErrorInternalServerError {
    info: ErrorResponse;

    constructor(statusText: string) {
        this.info = {
            status: ErrorStatus.INTERNAL_SERVER_ERROR,
            statusText,
        };
    }
}

