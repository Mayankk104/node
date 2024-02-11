class FibonacciController {
    private fibonacci(num: number): number {
        if (num < 1) return 0;
        if (num <= 2) return 1;
        return this.fibonacci(num - 1) + this.fibonacci(num - 2);
    }

    async doFib(num: number) {
        const start = Date.now();
        const result = this.fibonacci(num);
        return { result, 'time-taken': Date.now() - start };
    }
}

export default FibonacciController;
