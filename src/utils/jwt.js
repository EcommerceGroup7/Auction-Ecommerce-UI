const JWTManager = ()=>{
    let inMemoryToken
    const getToken = () => inMemoryToken
    const setToken = (accessToken) =>{
        inMemoryToken = accessToken
    }
    return {getToken, setToken}
}
export default JWTManager()