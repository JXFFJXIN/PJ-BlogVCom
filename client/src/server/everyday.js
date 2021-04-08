import axios from 'axios';

export default {
    async getOne() {
        const {data:{data}} = await axios.get('/api/ed')
        return data;
    },
    getCookie(name){
        const arr = document.cookie.split(';');
        const res = [];
        arr.map(it=>{
            const item = it.split('=');
            if(item[0] === name){
                res.push(item);
            }
        })
        return res[0][1];
    },
    async setOne(blog){
        const res = await axios({
            method:'post',
            url:'/api/ed',
            data:blog,
            headers:{
                'x-csrf-token':this.getCookie("csrfToken")
            }
        })
        return res;
    },
}