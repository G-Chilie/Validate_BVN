const secret = 'FLWSECK-c091f82b5fee928dce3d4738dbfba875-X';
const baseUrl = 'https://ravesandboxapi.flutterwave.com/v2/kyc/bvn';

async function manipulateDom() {
    const bvn = document.querySelector('#input-number').value;
    const error = document.querySelector('#error');
    const message = document.querySelector('.message');
    error.textContent = '';
    message.textContent = '';

    const isError = validateInput(bvn)
    if (isError) {
        return error.textContent = isError
    } else {
        error.textContent = ''
    }
    const user = await raveVerify(bvn);
    if (user.status !== 'success') {
        return message.textContent = 'Sorry, this BVN does not exist'
    } else {
        const { first_name, middle_name, last_name, phone_number } = user.data;
        return message.textContent = `${first_name} ${middle_name} ${last_name} with phone number: ${phone_number} has been verified, kindly proceed with onboarding`;
    }
}

function validateInput(value) {
    if (!value) {
        return 'Input field cannot be empty';
    } else if (value.length !== 11) {
        return 'BVN must be 11 digits'
    }
    return false
}

async function raveVerify(value) {
    const spinner = document.querySelector('.spinner')
    spinner.textContent = 'Loading...'
    const mainUrl = `${baseUrl}/${value}?seckey=${secret}`
    console.log(mainUrl)
    const response = await fetch(mainUrl)
    const userData = response.json()
    spinner.textContent = ''
    console.log(userData)
    return userData
}

const submitButton = document.querySelector('#submit-button')
submitButton.addEventListener('click', manipulateDom)