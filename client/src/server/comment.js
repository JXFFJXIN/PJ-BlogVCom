import axios from 'axios';

export default {
    async getAll({
        page,
        pageSize
    }) {
        const {data:{data}} = await axios.get('/api/cmt/new', {
            params: {
                page,
                pageSize,
            }
        })
        return data;
    },
    async setOne(comment) {
        await axios.post('/api/cmt', {
            data: comment,
        }).then((res)=>{
            console.log(res.data)
        })
    },
}