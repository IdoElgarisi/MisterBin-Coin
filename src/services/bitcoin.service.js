import axios from 'axios';
import { saveToStorage, loadFromStorage } from './storage.service';
import { contactService } from './contact.service'
import { transfer,getUser } from './user.service'

const RATE_URL = 'https://blockchain.info/tobtc?currency=USD&value=1'
const PRICE_URL = 'https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true';

export async function getRate() {
    // return $ to btc rate
    const rate = loadFromStorage('rate') || await axios.get(RATE_URL);
    saveToStorage('rate', rate)
    return rate.data
}

export async function getMarketPrice() {
    // return $ to btc rate
    let data = loadFromStorage('marketPrices')
    if (!data?.data) data = await axios.get(PRICE_URL);
    saveToStorage('marketPrices', data)
    return data.data.values
}
export async function getConfirmedTransactions() {

}

export async function transferBits(id, amount) {
    const user = await getUser()
    if (user.balance  - amount < 0 ) return Promise.reject('not enough bits')
    await transfer(+amount,id);
    await contactService.transfer(id,+amount)
    return Promise.resolve()
}
