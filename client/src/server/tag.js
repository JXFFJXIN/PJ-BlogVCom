import axios from 'axios';

export default {
    async getAll({
        page,
        pageSize
    }) {
        const {data:{data}} = await axios.get('/api/tag', {
            params: {
                page,
                pageSize,
            }
        })
        return data;
    },
}