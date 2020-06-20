const moment = require('moment')
module.exports = (userName , text)=>{
    return {
        userName , 
        text,
        time:moment().format('h:mm a')
    }

}