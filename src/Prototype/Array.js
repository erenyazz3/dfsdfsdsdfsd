
module.exports = 
Array.prototype.random = async function() {
    return this[Math.floor((Math.random()*this.length))];
    }
