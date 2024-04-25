import { request, gql } from 'graphql-request'

const MASTER_URL="https://api-eu-west-2.hygraph.com/v2/clv46c47z02lw07vzba8tvz3b/master"

const getSlider=async()=>{
    const query = gql`
        query GetSLider {
            sliders {
            id
            name
            image {
                url
            }
            }
        }
    `
        const result = await request(MASTER_URL, query);
        return result
    }

    const getCategory=async()=>{
        const query = gql`query GetCategory {
                categories {
                    id
                    name
                    icon {
                        url
                    }
                }
            }
            `

            const result=await request(MASTER_URL, query);
            return result;
        }
    const getBusinessLists=async()=>{
        const query = gql `
            query GetBusinessList {
                    businessLists {
                    id
                    email
                    name
                    images {
                    url
                    }
                    address
                    about
                    category {
                    id
                    name
                    }
                    contactPerson
                }
            }
        `
        const result = await request(MASTER_URL, query);
        return result;
    }

    const getBusinessListByCategory=async(category)=>{
        const query = gql`
            query GetBusinessList {
                businessLists(where: {category: {name: "`+category+`"}}) {
                id
                email
                name
                images {
                    url
                }
                address
                about
                category {
                    id
                    name
                }
                contactPerson
                }
            }
        `
        const result = await request(MASTER_URL, query);
        return result;
    }

    const createBooking=async(data)=>{

        const mutuationQuery = gql
        `
            mutation createBooking {
                createBooking(
                data: {
                    bookingStatus: Booked, 
                    business_List: {connect: {id: "`+data.businessId+`"}}, 
                    date: "`+data.date+`", 
                    time: "`+data.time+`", 
                    userName: "`+data.userName+`", 
                    userEmail: "`+data.userEmail+`"}
                ) {
                id
                }
                publishManyBookings(to: PUBLISHED) {
                    count
                }
            }
        `

        const result = await request(MASTER_URL, mutuationQuery);
        return result
    }

    const GetUserBookings = async (userEmail) => {

        const query = gql
        `
        query GetUserBookings {
            bookings(where: {userEmail: "`+userEmail+`"}) {
                date
                id
                time
                userEmail
                userName
                bookingStatus
                business_List {
                    id
                    email
                    name
                    address
                    contactPerson
                    about
                    images {
                    url
                    }
                }
            }
        }
            
        `
        const result = await request(MASTER_URL, query);
        return result
    }

    const EditBooking=async(data)=>{

        const mutuationQuery = gql
        `
            mutation EditBooking {
                updateBooking(
                data: {
                    bookingStatus: `+data.bookingStatus+`, 
                    date: "`+data.date+`", 
                    time: "`+data.time+`"}
                where: {id: "`+data.id+`"}
                ) {
                id
                }
                publishManyBookings(to: PUBLISHED) {
                count
                }
            }
            
        `
        const result=await request(MASTER_URL, mutuationQuery)
        return result;
    }
    
    export default {
        getSlider,
        getCategory,
        getBusinessLists,
        getBusinessListByCategory,
        createBooking,
        GetUserBookings,
        EditBooking
    }