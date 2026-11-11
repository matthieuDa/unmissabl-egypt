import {handleContact} from '../../server/contact.mjs';
export default (request, context) => handleContact(request,{env:process.env,ip:context.ip});
export const config={path:'/api/contact',rateLimit:{action:'rate_limit',aggregateBy:['domain','ip'],windowLimit:5,windowSize:600}};
