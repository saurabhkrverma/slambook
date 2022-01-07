import _ from "lodash";
import {v4 as uuid} from 'uuid';
import Questionnaire from "../../models/questionnaire";
import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import * as CONSTANTS from "constants";

const registerQuestionnaireRouter = (router) => {

    // get all write-ups
    router.get("/questionnaire/", async(req, res) => {
        try {
            const questionnaire = await Questionnaire.find({
                "email": _.get(req,"user.email")
            });
            console.log("kyub be", questionnaire, _.get(req,"user.email"));
            const response = buildResponse(req, RESPONSE_TYPES.QUESTIONNAIRE_FETCH_SUCCESS, questionnaire);
            res.send(response);
        } catch (err) {
            const response = buildResponse(req, RESPONSE_TYPES.QUESTIONNAIRE_FETCH_FAILURE, err);
            res.send(response);
        }
    });

    // get write-ups received
    // router.get("/questionnaire/requested/:requester", async(req, res) => {
    //     try {
    //         // const questionnaire = await questionnaire.find({"requester": req.params.requester});
    //         questionnaire.aggregate([{
    //                 $match: {
    //                     "requester": req.params.requester
    //                 }
    //             }, {
    //                 $lookup: {
    //                     "from": "users",
    //                     "localField": "author",
    //                     "foreignField": "email",
    //                     "as": "authorDetails"
    //                 }
    //             }
    //         ]).exec(function(err, result){
    //             if(err) throw err;
    //             res.send(result);
    //         })
    //         // res.send(questionnaire);
    //     } catch (error) {
    //         res.send(error);
    //     }
    //
    // });

    // get write-ups posted
    // router.get("/questionnaire/authored/:author", async(req, res) => {
    //     try {
    //         // const questionnaire = await questionnaire.find({"author": req.params.author});
    //         questionnaire.aggregate([{
    //             $match: {
    //                 "author": req.params.author
    //             }
    //         }, {
    //             $lookup: {
    //                 "from": "users",
    //                 "localField": "requester",
    //                 "foreignField": "email",
    //                 "as": "requesterDetails"
    //             }
    //         }
    //         ]).exec(function(err, result){
    //             if(err) throw err;
    //             res.send(result);
    //         })
    //         // res.send(questionnaire);
    //     } catch (error) {
    //         res.send(error);
    //     }
    //
    // });

    // add questionnaire
    router.post("/questionnaire", async(req,res) => {
        try {
            const questionnaire = new Questionnaire({
                email: _.get(req,"body.email") || _.get(req,"user.email"),
                name: _.get(req,"body.name"),
                collectionId: uuid(),
                form: _.get(req,"body.form")
            });
            await questionnaire.save();
            const response = buildResponse(req, RESPONSE_TYPES.QUESTIONNAIRE_ADDITION_SUCCESS, MESSAGES.QUESTIONNAIRE_ADDITION_SUCCESS);
            res.send(response);
        } catch (error) {
            const response = buildResponse(req, RESPONSE_TYPES.QUESTIONNAIRE_ADDITION_FAILURE, MESSAGES.QUESTIONNAIRE_ADDITION_FAILURE);
            res.send(response);
        }

    });

    // delete questionnaire
    router.delete("/questionnaire/:collectionId", async(req,res)=>{
        try{
            const questionnaire = await Questionnaire.deleteOne({
                "collectionId": _.get(req,"params.collectionId")
            });
            res.status(204).send();
        } catch (error) {

            res.send(error);
        }
    });
};

export default registerQuestionnaireRouter;
