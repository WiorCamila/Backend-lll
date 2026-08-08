import * as MockService from "../services/mock.service.js";

export class MockController {
    // GET = api/mocks/mockingdata
    static async getMockingData(req, res, next) {
        try {
            const { users = 5, orders = 10 } = req.query;
            const data = MockService.getMockDataService(users, orders);
            res.status(200).json({ status: 'success', payload: data });
        } catch (error) {
            next(error);
        }
    }

    // POST = api/mocks/generateData
    static async generateData(req, res, next) {
        try {
            const { usersCount = 5, ordersCount = 10 } = req.body;
            const result = await MockService.generateAndSaveDataService({ 
                usersCount, 
                ordersCount 
            });
            res.status(201).json({ status: 'success', payload: result });
        } catch (error) {
            next(error);
        }
    }
}