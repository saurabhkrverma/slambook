import _ from "lodash";
import { CONSTANTS } from "../config/constants"

export const sortPosts = (posts, order = CONSTANTS.ORDER_MOST_RECENT_FIRST) => {
    const sortedPosts = posts.slice().sort((post1, post2)=>{
        const post1Date = new Date(post1.createdOn);
        const post2Date = new Date(post2.createdOn);
        if(post1Date > post2Date) {
            return (order === CONSTANTS.ORDER_MOST_RECENT_FIRST) ? -1 : 1;
        } else if( post1Date < post2Date) {
            return (order === CONSTANTS.ORDER_MOST_RECENT_FIRST) ? 1 : -1;
        } else {
            return 0;
        }
    })
    return sortedPosts;
}
