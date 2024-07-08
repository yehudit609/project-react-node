export const CustomerService = {
    getOrders() {
        return new Promise((resolve) => {
            const orders = [
                {
                    id: 1,
                    date: '2024-05-23',
                    status: 'personal',
                    products: [
                        {
                            name: 'Product 1',
                            quantity: 2,
                            price: 10,
                            image: 'http://localhost:7777/uploads/a.jpg'
                        },
                        {
                            name: 'Product 2',
                            quantity: 1,
                            price: 20,
                            image: 'http://localhost:7777/uploads/b.jpg'
                        }
                    ],
                    total: 40
                },
                {
                    id: 2,
                    date: '2024-05-24',
                    status: 'reservation',
                    products: [
                        {
                            name: 'Product 3',
                            quantity: 3,
                            price: 15,
                            image: 'product3.jpg'
                        },
                        {
                            name: 'Product 4',
                            quantity: 1,
                            price: 25,
                            image:'http://localhost:7777/uploads/c.jpg'
                        }
                    ],
                    total: 70
                },
                {
                    id: 3,
                    date: '2024-05-25',
                    status: 'review',
                    products: [
                        {
                            name: 'Product 5',
                            quantity: 1,
                            price: 30,
                            image: 'product5.jpg'
                        },
                        {
                            name: 'Product 6',
                            quantity: 2,
                            price: 12,
                            image: 'product6.jpg'
                        }
                    ],
                    total: 54
                }
            ];
            
            resolve(orders);
        });
    }
};