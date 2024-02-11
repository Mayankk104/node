import { workerData, parentPort } from 'worker_threads';
import FibbonaciController from './fibonacci';

const fib = new FibbonaciController();

fib.doFib(workerData.num).then((result) => {
    parentPort?.postMessage(result);
});
