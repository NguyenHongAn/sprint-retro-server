const handleError= Promise =>{
        return Promise.then(data => [data, undefined]).
        catch(err => [undefined, err]);
    }


module.exports = handleError;