const valid = (  
    title, 
    full_name,
    amount,
    email,
    phone_number,
    linkedin_link,
    telegram,
    short_description, 
    long_description 
    )=> {
    if(!title || !short_description || !long_description|| 
        !amount  || !full_name ||!email ||  
        !phone_number || !linkedin_link||telegram)
    return 'Please add all fields.'

    if(!validateEmail(email))
    return 'Invalid emails.'
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid