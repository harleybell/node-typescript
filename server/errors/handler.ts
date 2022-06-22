import { Request } from "express"

export const errorNotification = (err:object, str:string, req: Request) => {
    const title = 'Error in ' + req.method + ' ' + req.url
    console.log( 'Error in handler =====================>', {
        error: err,
        title: title,
        message: str
    });
}