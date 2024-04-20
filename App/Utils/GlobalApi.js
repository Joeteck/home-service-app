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
    
    export default {
        getSlider,
        getCategory,
        getBusinessLists,
        getBusinessListByCategory,
    }