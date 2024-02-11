import express from 'express';
import WorkerThreadController from '../controllers/worker-thread';

const router = express.Router();
const workerThreadController = new WorkerThreadController();

router.post('/worker-thread', WorkerThreadController.getFibonacciNumsWithWorker);
router.post('/worker-thread/withoutthread', workerThreadController.getFibonacciNums);

export default router;
