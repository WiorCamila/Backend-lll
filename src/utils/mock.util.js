import { fakerES as faker } from '@faker-js/faker';
import { USER_ROLES, ORDER_STATUS, ORDER_PRIORITIES } from "../constants/index.js"

export const generateMockUsers = (count = 5) => {
    const users = [];
    const rolesList = [USER_ROLES.USER, USER_ROLES.ADMIN];

    for (let i = 0; i < count; i++) {
        users.push({
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password(),
            role: faker.helpers.arrayElement(rolesList),
        });
    }
    return users;
};

export const generateMockDeliveriesStaff = (count = 3) => {
    const staff = [];
    for (let i = 0; i < count; i++) {
        staff.push({
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password(),
            role: USER_ROLES.DELIVERY,
        });
    }
    return staff;
};

export const generateMockOrders = (userIds = [], count = 10) => {
    const orders = [];
    const statusList = Object.values(ORDER_STATUS);
    const priorityList = Object.values(ORDER_PRIORITIES);

    for (let i = 0; i < count; i++) {
        orders.push({
            user: userIds.length > 0 ? faker.helpers.arrayElement(userIds) : faker.database.mongodbObjectId(),
            items: [
                { 
                    title: faker.commerce.productName(), 
                    quantity: faker.number.int({ min: 1, max: 5 }), 
                    price: parseFloat(faker.commerce.price()) 
                }
            ],
            total: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
            status: faker.helpers.arrayElement(statusList),
            priority: faker.helpers.arrayElement(priorityList),
            address: faker.location.streetAddress(),
        });
    }
    return orders;
};

export const generateMockDeliveries = (orderIds = [], deliveryStaffIds = []) => {
    const deliveries = [];

    for (const orderId of orderIds) {
        deliveries.push({
            order: orderId,
            delivery_person: deliveryStaffIds.length > 0 ? faker.helpers.arrayElement(deliveryStaffIds) : faker.database.mongodbObjectId(),
            scheduled_date: faker.date.future(),
        });
    }
    return deliveries;
};