module.exports = (error, _request, response, _next) => {
    console.log('Entrando en ERROR Handler');
    console.error(error);
    response.status(500).end();
}