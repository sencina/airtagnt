const url = ''

const service = {

    location: async () => {

        const response = await fetch(url+'/location',{
            method: 'GET',
        })

        if (response.status === 200) {
            return response.json()
        }

    },

    scream: async () => {

        const response = await fetch(url+'/scream',{
            method: 'POST',
        })

        return response.status === 201;
    },

    shutUp: async () => {

        const response = await fetch(url+'/shutUp',{
            method: 'POST',
        })

        return response.status === 201;

    }

}

const useService = () => service

export default useService;