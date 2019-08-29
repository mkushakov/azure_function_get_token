const { parse } = require('querystring');
const DomParser = require('dom-parser');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body) {
        const data = parse(req.body);
        const wResult = data.wresult;
        const node = new DomParser().parseFromString(wResult, 'text/xml');
        const tokenBinary = node.getElementsByTagName('wsse:BinarySecurityToken')[0].innerHTML;
        const token = new Buffer(tokenBinary, 'base64').toString('ascii');

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "bearer " + token
        };
    }
    else {
        context.res = {
            status: 400,
            body: req.rawBody
        };
    }
};