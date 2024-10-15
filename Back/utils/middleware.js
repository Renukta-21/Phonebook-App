const errorHandler = (err, req, res, next) => {
    console.log('Error---------------------->    ' + err);
    console.log('');

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'Malformatted ID' });
    }else if(err.name==='ValidationError'){
        return res.status(400).send({error:err.message})
    }

    next(err);
};


module.exports = {
    errorHandler
}