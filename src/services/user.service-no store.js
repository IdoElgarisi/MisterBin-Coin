import { loadFromStorage, saveToStorage } from '../services/storage.service'
import { contactService } from '../services/contact.service'
const HC_USER = {
    name: "Muki D",
    balance: 100,
    moves: []
}

export async function getUser() {
    const localUser = loadFromStorage('user')
    const user = localUser ? localUser : HC_USER
    saveToStorage('user', user)
    return Promise.resolve(user)
}

export async function updateUser() {
    console.log('updating user')
}

export async function transfer(amount, contactId) {
    const user = loadFromStorage('user')
    user.moves.unshift({
        amount,
        balanceBefore: user.balance,
        contact: await contactService.getById(contactId),
        transferedAt: Date.now(),
        id: Date.now() % 1000
    })
    user.balance -= amount;
    saveToStorage('user', user)
    return Promise.resolve()
}

