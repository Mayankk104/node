import { Request, Response } from 'express';
import { Worker } from 'worker_threads';
import { resolve } from 'path';
import FibonacciController from './fibonacci';

class WorkerThreadController {
    private fib = new FibonacciController();

    getFibonacciNums = async (req: Request, res: Response) => {
        const { nums } = req.body;
        const start = Date.now();

        if (!Array.isArray(nums)) return res.status(400).json({ message: 'send nums' });

        const doFibs = nums.map((num) => this.fib.doFib(num));
        const values = await Promise.all(doFibs);

        return res.json({ values, 'total-time': Date.now() - start });
    };

    static getFibonacciNumsWithWorker = async (req: Request, res: Response) => {
        const { nums } = req.body;
        const start = Date.now();
        const relativePath = resolve(__dirname, './fibonacci-worker');

        if (!Array.isArray(nums)) return res.status(400).json({ message: 'send nums' });

        const promises = nums.map((num) => new Promise((_resolve) => {
            const worker = new Worker(relativePath, { workerData: { num }, execArgv: ['--require', 'ts-node/register'] });
            worker.once('message', (data: {value: number, 'time-taken': number}) => {
                _resolve(data);
                worker.terminate();
            });
        }));

        const values = await Promise.all(promises);

        return res.json({ result: values, 'total-time': Date.now() - start });
    };
}

export default WorkerThreadController;
