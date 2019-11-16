makeRequests = async (verb, api, data, token) => {
    if (verb === 'POST') {
    const response = await fetch(api, {
            method: verb,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } else if (verb === 'GET') {
        const response = await fetch(api, {
            method: verb,
            params: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
}
export default makeRequests;