const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title, 
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async index(request, response) {
        const [count] = await connection('incidents').count();//conta quantas ocorrencias na tabela 

        const { page = 1 } = request.query;
        
        const incident = await connection('incidents')
                                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                                .limit(5)
                                .offset((page-1)*5)
                                .select(['incidents.*', 
                                        'ongs.name', 
                                        'ongs.city', 
                                        'ongs.uf', 
                                        'ongs.email',
                                        'ongs.whatsapp']);

        response.header('X-total-count', count['count(*)']);//manda o total de ocorrencias pelo header

        return response.json(incident);
         
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if(incident.ong_id != ong_id ){
            return response.status(401).json({error: 'tu nao tm autorização meu camarada'});
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();

    }

}