
import { saveToStorage, loadFromStorage } from './storage.service';
export const contactService = {
    query,
    getById,
    save,
    remove,
    transfer
}

const CONTACTS = [
    {
        "_id": "cont-1",
        "name": "Ochoa Hyde",
        "email": "ochoahyde@renovize.com",
        "phone": "+1 (968) 593-3824",
        "balance": 0

    },
    {
        "_id": "cont-2",
        "name": "Moshe Blyde",
        "email": "lies@asd.com",
        "phone": "+1 (341) 593-3432",
        "balance": 0
    },
    {
        "_id": "cont-3",
        "name": "Someone Else",
        "email": "Someone@Someone.com",
        "phone": "+1 (213) 533-2131",
        "balance": 0
    },
    {
        "_id": "cont-4",
        "name": "Person personson",
        "email": "Person@Person.com",
        "phone": "+972 (1) 123-4533",
        "balance": 0
    },
    {
        "_id": "cont-5",
        "name": "Miste Bitcoin",
        "email": "bit@coin.con",
        "phone": "+21 (123) 321-123321",
        "balance": 0
    },

];

async function query(filterBy) {
    let contacts = loadFromStorage('contact')
    if (contacts?.length) {
        return Promise.resolve(contacts.filter(contact => contact.name.toLowerCase().includes(filterBy.toLowerCase())));
    }
    saveToStorage('contact', CONTACTS);
    return Promise.resolve(CONTACTS);
}

async function getById(id) {
    if (!id) return
    const contacts = loadFromStorage('contact')
    const contact = contacts.find(c => id === c._id)
    if (contact) return Promise.resolve(contact)
    throw new Error('contact not found')
}

async function save(contact) {
    const contacts = loadFromStorage('contact')
    if (contact._id) {
        const contactIdx = contacts.findIndex(c => c._id === contact._id)
        contacts[contactIdx] = contact;
    } else {
        contact._id = `con-${new Date() % 10000 + (Math.random() * 100).toFixed(0)}`;
        contact.balance = 0
        contacts.push(contact)
    }
    saveToStorage('contact', contacts)
    return Promise.resolve()
}

async function remove(id) {
    const contacts = loadFromStorage('contact')
    const contactIdx = contacts.findIndex(c => id === c._id)
    contacts.splice(contactIdx, 1)
    saveToStorage('contact', contacts)
    return Promise.resolve()
}

export async function transfer(id, amount) {
    const contacts = loadFromStorage('contact')
    const contactIdx = contacts.findIndex(c => c._id === id)
    contacts[contactIdx].balance += amount
    saveToStorage('contact', contacts)

    return Promise.resolve()
}