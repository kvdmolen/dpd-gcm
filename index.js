var Resource = require('deployd/lib/resource');
var util     = require('util');
var gcm      = require('node-gcm');

function dpdgcm( options ) {
    Resource.apply(this, arguments);
    this.gcmsender = new gcm.Sender(this.config.APIKey);
}

util.inherits(dpdgcm, Resource);

dpdgcm.label = "GCM";
dpdgcm.events = ["post"];

dpdgcm.prototype.clientGeneration = true;

dpdgcm.basicDashboard = {
    settings: [
        {
            name        : 'APIKey',
            type        : 'string',
            description : 'API Key'
        },
        {
            name        : 'defaultMsg',
            type        : 'string',
            description : 'Default Message'
        }
    ]
};

dpdgcm.prototype.handle = function ( ctx, next ) {

    var devices;
    var message;

    if(ctx.body && ctx.body.devices){
        devices = ctx.body.devices;
    }

    if(ctx.body && ctx.body.message){
        message = ctx.body.message;
    }else{
        message = this.config.defaultMsg;
    }

    var msg = new gcm.Message();

    msg.delay_while_idle = false;
    msg.addData("message",message);

    this.gcmsender.send(msg, devices, 5, function(err, result) {
        if(err){
            ctx.done(err);
        }else{
            ctx.done(null, result);
        }
    });
};

module.exports = dpdgcm;