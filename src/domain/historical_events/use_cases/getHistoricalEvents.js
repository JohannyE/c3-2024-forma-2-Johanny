import historicalEventsRepository from '../repository/historicalEventsRepository'

exports.getHistoricalEventsByOcurrence = (ctx) => {
    try {
        const ocurrence = ctx.params.ocurrence
        const eventos = historicalEventsRepository.getHistoricalEvents(ctx.params.ocurrence)
        ctx.body = eventos
        ctx.status = 200

    } catch (error) {
        switch (error.message) {
            case 'El input debe ser ac o dc':
                ctx.body = {"message": "El input debe ser ac o dc"}
                ctx.status = 400
                break;
            
            case 'Solo se aceptan caracteres no numéricos':
                ctx.body = {"message": "Solo se aceptan caracteres no numéricos"}
                ctx.status = 400
                break;
        }
    }
    return ctx
}