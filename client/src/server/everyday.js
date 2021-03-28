import axios from 'axios';

export default {
    async getOne() {
        const {data:{data}} = await axios.get('/api/ed')
        return data;
    },
    async setOne(everyday) {
        await axios.post('/api/ed', {
            data: everyday,
        }).then((res)=>{
            console.log(res.data)
        })
    },
}