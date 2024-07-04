import eventosJSON from '../../../../dataset/historical_data.json'

exports.getHistoricalEvents = (ocurrence) => {
    if (ocurrence.length != 2) {
        throw new Error('El input debe ser ac o dc')
    }

    if (ocurrence == 'ac' || ocurrence == 'AC' ){
        return eventosJSON.result.events.filter((evn) => evn.date <= 0).sort((a, b) => a.date - b.date)
    } else if(ocurrence =='dc' || ocurrence == 'DC' ){
        return eventosJSON.result.events.filter((evn) => evn.date > 0).sort((a, b) => a.date - b.date)
    }
    
    throw new Error('Solo se aceptan caracteres no numéricos')
}