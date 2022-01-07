import _ from "lodash";
import {v4 as uuid} from 'uuid';
import Questionnaire from "../../models/request";
import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import * as CONSTANTS from "constants";
import Request from "../../models/request";

const registerRequestRouter = (router) => {

    // get all write-ups
    router.get("/request/", async(req, res) => {
        try {
            const request = await Request.find({
                "email": _.get(req,"user.email")
            });
            const response = buildResponse(req, RESPONSE_TYPES.QUESTIONNAIRE_FETCH_SUCCESS, request);
            res.send(response);
        } catch (err) {
            const response = buildResponse(req, RESPONSE_TYPES.QUESTIONNAIRE_FETCH_FAILURE, err);
            res.send(response);
        }
    });

    // add request
    router.post("/request", async(req,res) => {
        try {
            const email = _.get(req,"user.email");
            const collectionId = req.body.collectionId;
            const request = new Request({
                _id: {
                    email: email,
                    collectionId: collectionId
                },
                email: email,
                collectionId: collectionId
            });
            await request.save();
            const response = buildResponse(req, RESPONSE_TYPES.REQUEST_SUBMISSION_SUCCESS, MESSAGES.REQUEST_SUBMISSION_SUCCESS);
            res.send(response);
        } catch (error) {
            const response = buildResponse(req, RESPONSE_TYPES.REQUEST_SUBMISSION_FAILURE, error);
            res.send(response);
        }

    });

    // delete request
    router.delete("/request/:collectionId", async(req,res)=>{
        try{
            const request = await Questionnaire.deleteOne({
                "collectionId": _.get(req,"params.collectionId")
            });
            res.status(204).send();
        } catch (error) {

            res.send(error);
        }
    });
};

export default registerRequestRouter;
