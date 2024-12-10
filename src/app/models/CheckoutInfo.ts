export interface Product {
    best_choice: boolean,
    discount: number,
    freight: string,
    image_url: string,
    name: string,
    price: number,
    product_id: number
}

export interface Checkout {
    checkout_id: number,
    created_at: string,
    identifier: string,
    products: Product[]
    updated_at: string,
    video_headline: string,
    video_sub_headline: string,
    video_url: string
}

export interface CheckoutInfo {
    HTTPStatus: number
    executed: boolean
    message: string
    object: Checkout[]
    userIdentified: boolean,
    userToken: string
}