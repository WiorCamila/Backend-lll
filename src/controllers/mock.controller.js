import { MockService } from "../services/mock.service.js"

export class MockController {
    // GET = api/mocks/mockingdata
    static async getMockingData(req, res) {
    try {
        const { users = 5, orders = 10 } = req.query;
        const data = await MockService.getMockData(Number(users), Number(orders))
        res.status(200).json({ status: 'success', payload: data })
        } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
        }
    }

    // POST = api/mocks/generateData
    static async generateData(req, res) {
        try {
        const { usersCount = 5, ordersCount = 10 } = req.body
        const result = await MockService.generateAndSaveData({ 
            usersCount: Number(usersCount), 
            ordersCount: Number(ordersCount) 
        });
        res.status(201).json({ status: 'success', payload: result })
        } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
        }
    }
}