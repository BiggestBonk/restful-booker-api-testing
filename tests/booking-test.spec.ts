import {test, expect} from '@playwright/test'
import dotenv from 'dotenv'


dotenv.config()
let token: string
let bookingId: number

test.beforeAll(async ({ request }) => {

    const authResponse = await request.post('/auth', {
        data: {
            username: process.env.BOOKER_USERNAME,
            password: process.env.BOOKER_PASSWORD
        }
    })
    const authBody = await authResponse.json()
    token = authBody.token
})
test('Should create a new booking', async ({request})=> {
    const response = await request.post('/booking', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: {
            firstname: 'Jeff',
            lastname: 'Bezos',
            totalprice: 1000000000,
            depositpaid: true,
            bookingdates: {
                checkin: '2020-06-06',
                checkout: '2026-12-12'
            },
            additionalneeds: "Better margins"
        }
    })
    const responseBody = await response.json()
    bookingId = responseBody.bookingid
    expect(response.status()).toBe(200)
    expect(responseBody.booking.depositpaid).toBe(true)
    expect(responseBody.booking.additionalneeds).toBe('Better margins')
    
})
test('Should return all bookingids', async ({request}) =>
{
    const response = await request.get('/booking')
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody[0]).toHaveProperty('bookingid')
    expect(responseBody[5]).toHaveProperty('bookingid')
})
test('Should return the details of the created booking', async ({request}) =>
{
    const response = await request.get(`/booking/${bookingId}`)
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody).toHaveProperty('firstname')
    expect(responseBody.lastname).toBe('Bezos')
})
test('Should update the details of the created booking', async ({request}) => {
    const response = await request.put(`/booking/${bookingId}`,{
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Cookie': `token=${token}`
        },
        data:{
            'firstname':'Jeffrey',
            'lastname':'Bezos',
            'totalprice':1000000000000,
            'depositpaid':true,
            'bookingdates': {
                'checkin': '2020-06-06',
                'checkout': '2026-12-12'
            },
            'additionalneeds':'A monopoly over American consumer products'
        }
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.firstname).toBe('Jeffrey')
    expect(responseBody.additionalneeds).toBe('A monopoly over American consumer products')
})
test('Should partially change the details of the created booking', async ({request}) => {
    const response = await request.patch(`/booking/${bookingId}`, {
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Cookie': `token=${token}`
        },
        data: {
            'firstname':'Geoffrey',
            'lastname':'Moneybags'
        }
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.firstname).toBe('Geoffrey')
    expect(responseBody.lastname).toBe('Moneybags') 
})
test('Should delete the created booking', async ({request}) => {
    const response = await request.delete(`/booking/${bookingId}`, {
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Cookie':`token=${token}`
        }
    })
    expect(response.status()).toBe(201)
})
