

export const addRequest = (req,res,next) => {
    if(req.user && req.session.request) {
        delete req.session.request;
    }
    next();
}
