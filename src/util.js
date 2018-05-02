export function getRedirectPath({type, avatar}) {
    //Redirect
    //user.type /male/female
    // user.avatar /maleinfo / femaleinfo
    let url = (type === 'male') ? '/male' : 'female'
    if (!avatar) {
        url += 'info'
    }
    return url
}